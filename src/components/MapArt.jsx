import { WORLD, trailPath, dayRegions } from '../data/mapLayout.js'

// The blue canvas behind the stations: a light dashed trail winding through the
// weekend, plus faint day-region labels. Purely decorative background.
export default function MapArt() {
  return (
    <svg
      className="map-art"
      viewBox={`0 0 ${WORLD.w} ${WORLD.h}`}
      width={WORLD.w}
      height={WORLD.h}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={trailPath()}
        fill="none"
        stroke="#bfe0f3"
        strokeWidth="6"
        strokeDasharray="4 22"
        strokeLinecap="round"
        opacity="0.8"
      />
      {dayRegions.map((r) => (
        <text
          key={r.day}
          x={r.x}
          y={r.y}
          textAnchor="middle"
          className="map-day-label"
        >
          {r.day}
        </text>
      ))}
    </svg>
  )
}
