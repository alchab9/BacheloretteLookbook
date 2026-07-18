import { motion } from 'framer-motion'
import { outro } from '../data/journey.js'

// Closing screen after the last event — offers a way back to the start.
export default function ClosingOverlay({ onRestart, onBack }) {
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
        💃🪩🍷
      </motion.div>
      <h1>{outro.title}</h1>
      <div className="overlay-sub">{outro.subtitle}</div>
      <div className="overlay-tagline">{outro.tagline}</div>
      <button className="overlay-cta" onClick={onRestart}>
        Start over 🔁
      </button>
      <button className="overlay-secondary" onClick={onBack}>
        ← Back to the weekend
      </button>
    </motion.div>
  )
}
