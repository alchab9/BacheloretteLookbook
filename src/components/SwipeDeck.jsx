import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { events, roles } from '../data/journey.js'
import DayTab from './DayTab.jsx'
import PhotoSlot from './PhotoSlot.jsx'
import DiscoProgress from './DiscoProgress.jsx'

// Distance (px) a drag must travel to count as a swipe.
const SWIPE = 60

// Mobile experience: one photo at a time. Swipe left/right moves through the 9
// photos of an event (Alex → Natalie → Together, Outfit 1, 2, 3); swipe up/down
// jumps between events.
export default function SwipeDeck({ nav, goNext, goPrev, goToEvent, goToScreen }) {
  const event = events[nav.eventIndex]
  const outfitIndex = Math.floor(nav.pos / 3)
  const role = roles[nav.pos % 3]
  const outfit = event.outfits[outfitIndex]
  const src = outfit[role]

  // Remember the axis+direction of the last move so the card animates the right way.
  const dir = useRef({ axis: 'x', sign: 1 })

  const nextEvent = () => {
    dir.current = { axis: 'y', sign: 1 }
    if (nav.eventIndex < events.length - 1) goToEvent(nav.eventIndex + 1, 0)
    else goToScreen('closing')
  }
  const prevEvent = () => {
    dir.current = { axis: 'y', sign: -1 }
    if (nav.eventIndex > 0) goToEvent(nav.eventIndex - 1, 0)
    else goToScreen('title')
  }
  const nextPhoto = () => {
    dir.current = { axis: 'x', sign: 1 }
    goNext()
  }
  const prevPhoto = () => {
    dir.current = { axis: 'x', sign: -1 }
    goPrev()
  }

  const onDragEnd = (_e, info) => {
    const { offset } = info
    const horizontal = Math.abs(offset.x) > Math.abs(offset.y)
    if (horizontal) {
      if (offset.x <= -SWIPE) nextPhoto()
      else if (offset.x >= SWIPE) prevPhoto()
    } else {
      if (offset.y <= -SWIPE) nextEvent()
      else if (offset.y >= SWIPE) prevEvent()
    }
  }

  // Enter/exit offsets follow the last gesture's axis and direction.
  const enterExit = () => {
    const d = dir.current
    const dist = 60
    if (d.axis === 'x') {
      return {
        enter: { x: d.sign * dist, y: 0, opacity: 0 },
        exit: { x: -d.sign * dist, y: 0, opacity: 0 },
      }
    }
    return {
      enter: { x: 0, y: d.sign * dist, opacity: 0 },
      exit: { x: 0, y: -d.sign * dist, opacity: 0 },
    }
  }
  const anim = enterExit()

  return (
    <div className="deck">
      <div className="deck-top">
        <DayTab event={event} />
      </div>

      <div className="deck-stage">
        <AnimatePresence mode="popLayout" custom={dir.current}>
          <motion.div
            key={`${nav.eventIndex}-${nav.pos}`}
            className="deck-card"
            drag
            dragSnapToOrigin
            dragElastic={0.25}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={onDragEnd}
            initial={anim.enter}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={anim.exit}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <PhotoSlot src={src} role={role} outfitNumber={outfitIndex + 1} />
            <div className="deck-photo-label">
              <strong />
              <span>Option {outfitIndex + 1}</span>
            </div>
            {outfit.warning && (
              <div className="deck-warning">⚠️ {outfit.warning}</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="deck-caption">{event.caption}</div>

      <div className="deck-hints">
        <span>← → outfits & looks</span>
        <span>↑ ↓ events</span>
      </div>

      <DiscoProgress activeIndex={nav.eventIndex} />
    </div>
  )
}
