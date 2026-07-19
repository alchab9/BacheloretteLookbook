import { STATION_WIDTH, BALL_SIZE } from '../data/mapLayout.js'
import OutfitGroup from './OutfitGroup.jsx'

// A stop on the map: a disco-ball (🪩) + event label, with the event's three
// outfit groups stacked below it (always in the DOM — you zoom in to read them).
// Visited stations glow gold; the current one glows white; the active outfit is
// highlighted without moving the camera.
export default function EventStation({
  event,
  index,
  station,
  isActive,
  isVisited,
  activeOutfit,
  onSelect,
  registerStation,
  registerIntro,
  registerOutfit,
}) {
  const ballState = isActive ? 'active' : isVisited ? 'done' : ''

  return (
    <div
      className="event-station"
      ref={(node) => registerStation(index, node)}
      style={{
        left: station.x,
        top: station.y,
        width: STATION_WIDTH,
      }}
    >
      <div className="station-intro" ref={(node) => registerIntro(index, node)}>
        <button
          className="station-head"
          onClick={() => onSelect(index)}
          aria-label={`${event.day} · ${event.event}`}
        >
          <span
            className={`emoji-ball ${ballState}`}
            style={{ fontSize: BALL_SIZE }}
          >
            🪩
          </span>
          <span className="station-label">
            {event.event} {event.emoji}
          </span>
        </button>
        <div className="station-caption">{event.caption}</div>
      </div>

      <div className={`station-panel ${isActive ? 'active' : ''}`}>
        {event.outfits.map((outfit, oi) => (
          <OutfitGroup
            key={oi}
            outfit={outfit}
            outfitNumber={oi + 1}
            isActive={isActive && activeOutfit === oi}
            registerRef={(node) => registerOutfit(`${index}-${oi}`, node)}
          />
        ))}
      </div>
    </div>
  )
}
