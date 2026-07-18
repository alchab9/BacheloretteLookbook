import { STATION_WIDTH, BALL_SIZE } from '../data/mapLayout.js'
import OutfitGroup from './OutfitGroup.jsx'

// A stop on the map: a disco-ball + event label, with the event's three outfit
// groups stacked below it (always in the DOM — you literally zoom in to read them).
// Visited stations gild gold; the current one glows.
export default function EventStation({
  event,
  index,
  station,
  isActive,
  isVisited,
  activeOutfit,
  onSelect,
  registerOutfit,
}) {
  return (
    <div
      className="event-station"
      style={{
        left: station.x,
        top: station.y,
        width: STATION_WIDTH,
      }}
    >
      <button
        className="station-head"
        onClick={() => onSelect(index)}
        aria-label={`${event.day} · ${event.event}`}
      >
        <span
          className={`disco-ball ${isVisited ? 'done' : ''} ${isActive ? 'active' : ''}`}
          style={{ width: BALL_SIZE, height: BALL_SIZE }}
        />
        <span className="station-label">
          {event.event} {event.emoji}
        </span>
      </button>

      <div className={`station-panel ${isActive ? 'active' : ''}`}>
        <div className="station-caption">{event.caption}</div>
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
