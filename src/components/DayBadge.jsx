import { AnimatePresence, motion } from 'framer-motion'

// Big fixed day indicator (top-center) for the desktop map. Keyed on the day so it
// pops each time the guided tour crosses into a new day — making day changes obvious.
// Shows the current event too ("Thursday · Play Clothes") so you always know the stop.
export default function DayBadge({ day, event }) {
  return (
    <div className="day-badge-wrap" aria-live="polite">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={day}
          className="day-badge"
          initial={{ y: -24, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 16, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          <span className="day-badge-ball">🪩</span>
          <span className="day-badge-text">
            {day}
            {event ? ` · ${event}` : ''}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
