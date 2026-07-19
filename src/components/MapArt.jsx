import { WORLD, trailPath, dayBands } from '../data/mapLayout.js'

// The blue canvas behind the stations: tinted day-bands that group the weekend
// into Thu/Fri/Sat/Sun, a light dashed trail winding through, and big day labels.
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
      {/* Alternating day bands + vertical dividers make the day grouping obvious. */}
      {dayBands.map((b, i) => (
        <g key={b.day}>
          <rect
            x={b.x}
            y={80}
            width={b.w}
            height={WORLD.h - 160}
            rx={40}
            fill="#ffffff"
            opacity={i % 2 === 0 ? 0.06 : 0.11}
          />
          <text x={b.cx} y={220} textAnchor="middle" className="map-day-label">
            {b.day}
          </text>
        </g>
      ))}

      <path
        d={trailPath()}
        fill="none"
        stroke="#bfe0f3"
        strokeWidth="6"
        strokeDasharray="4 22"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  )
}
