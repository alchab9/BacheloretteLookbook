// Geometry for the desktop zoom-map "world". The map is one big canvas the user
// pans/zooms around; these coordinates place the 9 stations in a gentle wave and
// let MapArt draw the trail through them. Units are world pixels (pre-zoom).

import { events } from './journey.js'

export const WORLD = { w: 8600, h: 2500 }

// Fixed cell width for a station (ball + its outfit panel). Stations are spaced
// wider than this so panels never overlap at full zoom.
export const STATION_WIDTH = 760
export const BALL_SIZE = 96

const X0 = 520
const X_STEP = 920

// Ball-top y for each event — a wave that also keeps the day-clusters visually grouped.
const Y_BY_INDEX = [900, 560, 980, 520, 960, 540, 980, 520, 900]

export const stations = events.map((ev, i) => {
  const x = X0 + i * X_STEP
  const y = Y_BY_INDEX[i]
  return {
    id: ev.id,
    index: i,
    x, // left edge is x - STATION_WIDTH/2 (station is centered on x)
    y, // top of the station cell (ball sits here)
    ballCx: x,
    ballCy: y + BALL_SIZE / 2,
  }
})

// Smooth-ish trail path through the ball centers (a Catmull-Rom-style cubic).
export function trailPath() {
  const pts = stations.map((s) => [s.ballCx, s.ballCy])
  if (pts.length < 2) return ''
  let d = `M ${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[Math.max(0, i - 1)]
    const [x1, y1] = pts[i]
    const [x2, y2] = pts[i + 1]
    const [x3, y3] = pts[Math.min(pts.length - 1, i + 2)]
    const c1x = x1 + (x2 - x0) / 6
    const c1y = y1 + (y2 - y0) / 6
    const c2x = x2 - (x3 - x1) / 6
    const c2y = y2 - (y3 - y1) / 6
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${x2},${y2}`
  }
  return d
}

// Day-region labels floated above their clusters.
export const dayRegions = [
  { day: 'Thursday', x: stations[1].x, y: 210 },
  { day: 'Friday', x: stations[4].x, y: 170 },
  { day: 'Saturday', x: (stations[6].x + stations[7].x) / 2, y: 170 },
  { day: 'Sunday', x: stations[8].x, y: 210 },
]
