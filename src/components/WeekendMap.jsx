import { useEffect, useRef } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { events } from '../data/journey.js'
import { WORLD, stations } from '../data/mapLayout.js'
import MapArt from './MapArt.jsx'
import EventStation from './EventStation.jsx'
import DiscoMarker from './DiscoMarker.jsx'
import MapControls from './MapControls.jsx'

// Desktop experience: one big blue canvas the user pans and zooms. A three-level
// guided zoom (overview → whole event → one outfit row) steps through nav; clicking
// a station also flies in. Everything is real DOM at world scale — genuine semantic zoom.
export default function WeekendMap({ nav, goToEvent, goToScreen }) {
  const apiRef = useRef(null)
  const worldRef = useRef(null)
  const stationRefs = useRef({})
  const introRefs = useRef({})
  const outfitRefs = useRef({})

  const registerStation = (index, node) => {
    if (node) stationRefs.current[index] = node
    else delete stationRefs.current[index]
  }
  const registerIntro = (index, node) => {
    if (node) introRefs.current[index] = node
    else delete introRefs.current[index]
  }
  const registerOutfit = (key, node) => {
    if (node) outfitRefs.current[key] = node
    else delete outfitRefs.current[key]
  }

  const active = nav.screen === 'event' ? nav.eventIndex : -1
  // pos 0 = whole event, pos 1 = title & caption, pos 2–4 = an outfit row.
  const activeOutfit = nav.screen === 'event' ? nav.pos - 2 : -1

  // Guided zoom driven by nav:
  //   not-an-event (overview/title/closing) → whole weekend, centered
  //   event / pos 0   → the whole station (ball + title + caption + 3 outfits)
  //   event / pos 1   → the title & description (ball + event name + caption)
  //   event / pos 2–4 → that outfit row, filling the width
  useEffect(() => {
    const api = apiRef.current
    if (!api) return

    if (nav.screen !== 'event') {
      // Overview: fit the whole weekend and center it in the viewport (both axes).
      // Computed with setTransform so it's exact — zoomToElement on the full-size
      // world node is unreliable (it lands zoomed-in on the first day).
      const id = requestAnimationFrame(() => {
        const vw = window.innerWidth
        const vh = window.innerHeight
        const scale = Math.max(
          0.05,
          Math.min((vw * 0.92) / WORLD.w, (vh * 0.9) / WORLD.h),
        )
        const x = vw / 2 - (WORLD.w / 2) * scale
        const y = vh / 2 - (WORLD.h / 2) * scale
        api.setTransform(x, y, scale, 600)
      })
      return () => cancelAnimationFrame(id)
    }

    // Pick the node + framing margins for this zoom level.
    let node, marginW, marginH
    if (nav.pos === 0) {
      node = stationRefs.current[nav.eventIndex]
      marginW = 0.94
      marginH = 0.82
    } else if (nav.pos === 1) {
      node = introRefs.current[nav.eventIndex]
      marginW = 0.7
      marginH = 0.62
    } else {
      node = outfitRefs.current[`${nav.eventIndex}-${nav.pos - 2}`]
      marginW = 0.92
      marginH = 0.86
    }
    if (!node) return

    // rAF so the node has laid out (offset sizes are world px — transform-agnostic).
    const id = requestAnimationFrame(() => {
      const scale = Math.max(
        0.1,
        Math.min(
          (window.innerWidth * marginW) / node.offsetWidth,
          (window.innerHeight * marginH) / node.offsetHeight,
        ),
      )
      api.zoomToElement(node, scale, 650)
    })
    return () => cancelAnimationFrame(id)
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
          <div className="map-world" ref={worldRef} style={{ width: WORLD.w, height: WORLD.h }}>
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
                activeOutfit={active === i ? activeOutfit : -1}
                onSelect={(idx) => goToEvent(idx, 0)}
                registerStation={registerStation}
                registerIntro={registerIntro}
                registerOutfit={registerOutfit}
              />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>

      <MapControls apiRef={apiRef} onOverview={() => goToScreen('overview')} />
    </div>
  )
}
