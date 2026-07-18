import { motion } from 'framer-motion'
import { BALL_SIZE } from '../data/mapLayout.js'

// The "you are here" halo that glides along the trail to the active station.
export default function DiscoMarker({ station }) {
  if (!station) return null
  const size = BALL_SIZE + 34
  return (
    <motion.div
      className="disco-marker"
      style={{ width: size, height: size }}
      animate={{ left: station.ballCx, top: station.ballCy }}
      transition={{ type: 'spring', stiffness: 90, damping: 20 }}
    />
  )
}
