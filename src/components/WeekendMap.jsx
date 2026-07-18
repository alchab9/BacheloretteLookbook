import { useEffect, useRef } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { events } from '../data/journey.js'
import { WORLD, stations } from '../data/mapLayout.js'
import MapArt from './MapArt.jsx'
import EventStation from './EventStation.jsx'
import DiscoMarker from './DiscoMarker.jsx'
import MapControls from './MapControls.jsx'

// Desktop experience: one big blue canvas the user pans and zooms. Clicking a
// station — or the arrow-key guided tour — flies the camera to the exact outfit
// group. Everything is real DOM at world scale, so zooming is genuine semantic zoom.
export default function WeekendMap({ nav, goToEvent }) {
  const apiRef = useRef(null)
  const outfitRefs = useRef({})

  const registerOutfit = (key, node) => {
    if (node) outfitRefs.current[key] = node
    else delete outfitRefs.current[key]
  }

  const active = nav.screen === 'event' ? nav.eventIndex : -1

  // Fly the camera to the active outfit group whenever navigation changes.
  useEffect(() => {
    const api = apiRef.current
    if (!api || nav.screen !== 'event') return
    const node = outfitRefs.current[`${nav.eventIndex}-${nav.pos}`]
    if (node) {
      // rAF so the node has laid out before we measure it.
      const id = requestAnimationFrame(() => api.zoomToElement(node, 1.15, 700))
      return () => cancelAnimationFrame(id)
    }
  }, [nav.screen, nav.eventIndex, nav.pos])

  return (
    <div className="weekend-map">
      <TransformWrapper
        ref={apiRef}
        minScale={0.08}
        maxScale={3}
        initialScale={0.16}
        centerOnInit
        limitToBounds={false}
        wheel={{ step: 0.08 }}
        doubleClick={{ mode: 'zoomIn', step: 0.7 }}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '100%' }}
          contentStyle={{ width: WORLD.w, height: WORLD.h }}
        >
          <div className="map-world" style={{ width: WORLD.w, height: WORLD.h }}>
            <MapArt />
            <DiscoMarker station={active >= 0 ? stations[active] : null} />
            {events.map((event, i) => (
              <EventStation
                key={event.id}
                event={event}
                index={i}
                station={stations[i]}
                isActive={active === i}
                isVisited={active > i}
                activeOutfit={nav.pos}
                onSelect={(idx) => goToEvent(idx, 0)}
                registerOutfit={registerOutfit}
              />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>

      <MapControls apiRef={apiRef} />
    </div>
  )
}
