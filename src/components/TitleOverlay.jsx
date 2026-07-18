import { motion } from 'framer-motion'
import { intro } from '../data/journey.js'

// Opening screen — tap "Let's go" (or press →) to enter the weekend.
export default function TitleOverlay({ onStart }) {
  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="overlay-balls"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
      >
        🪩🍷🪩
      </motion.div>
      <h1>{intro.title}</h1>
      <div className="overlay-sub">{intro.subtitle}</div>
      <div className="overlay-tagline">{intro.tagline}</div>
      <button className="overlay-cta" onClick={onStart}>
        Let's go →
      </button>
    </motion.div>
  )
}
