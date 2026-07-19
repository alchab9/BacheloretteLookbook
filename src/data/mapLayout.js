// Geometry for the desktop zoom-map "world". The map is one big canvas the user
// pans/zooms around; these coordinates place the 9 stations in a gentle wave and
// let MapArt draw the trail through them. Units are world pixels (pre-zoom).

import { events } from './journey.js'

export const WORLD = { w: 8600, h: 2100 }

// Fixed cell width for a station (ball + its outfit panel). Stations are spaced
// wider than this so panels never overlap at full zoom.
export const STATION_WIDTH = 760
export const BALL_SIZE = 96

const X0 = 520
const X_STEP = 920

// Straight horizontal layout — all stations share one baseline, so the trail
// runs left-to-right across the weekend. Sits just below the big day label so the
// overview doesn't waste vertical space between the day name and the disco balls.
const BASE_Y = 300

export const stations = events.map((ev, i) => {
  const x = X0 + i * X_STEP
  const y = BASE_Y
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

// Day regions: each spans the x-range of its consecutive events. Used to draw
// tinted background bands + big labels so the day-clusters read clearly, and so
// crossing from one day to the next is visually obvious.
const HALF = STATION_WIDTH / 2
const BAND_PAD = 70

export const dayBands = (() => {
  const bands = []
  let start = 0
  for (let i = 1; i <= stations.length; i++) {
    if (i === stations.length || events[i].day !== events[start].day) {
      const first = stations[start]
      const last = stations[i - 1]
      const x = first.x - HALF - BAND_PAD
      const w = last.x + HALF + BAND_PAD - x
      bands.push({ day: events[start].day, x, w, cx: (first.x + last.x) / 2 })
      start = i
    }
  }
  return bands
})()
