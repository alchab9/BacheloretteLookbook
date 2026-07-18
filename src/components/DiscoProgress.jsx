import { motion } from 'framer-motion'
import { events } from '../data/journey.js'

// The mobile progress indicator: a disco ball rolling along a 9-notch track (one
// notch per event). Passed notches gild gold; the ball sits on the active event.
export default function DiscoProgress({ activeIndex }) {
  const count = events.length

  return (
    <div className="disco-progress" aria-hidden="true">
      <div className="disco-track">
        {events.map((ev, i) => (
          <span
            key={ev.id}
            className={`disco-notch ${i < activeIndex ? 'passed' : ''} ${
              i === activeIndex ? 'current' : ''
            }`}
          />
        ))}
      </div>
      <motion.div
        className="disco-progress-ball"
        // Position the ball over the active notch (evenly spaced across the track).
        animate={{ left: `calc(${(activeIndex / (count - 1)) * 100}% )` }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        <motion.span
          className="disco-ball"
          style={{ width: 26, height: 26 }}
          animate={{ rotate: activeIndex * 90 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
      </motion.div>
    </div>
  )
}
