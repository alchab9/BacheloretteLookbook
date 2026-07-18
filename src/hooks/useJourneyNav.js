import { useCallback, useEffect, useState } from 'react'
import { events } from '../data/journey.js'

const LAST_EVENT = events.length - 1

// Shared navigation for both platforms. `pos` counts the steps *within* an event:
// desktop steps through 3 outfits, mobile steps through 9 photos. goNext/goPrev
// walk those steps and roll across event boundaries, with a title screen before
// event 1 and a closing screen after event 9.
export function useJourneyNav(isMobile) {
  const stepsPerEvent = isMobile ? 9 : 3
  const lastStep = stepsPerEvent - 1

  const [nav, setNav] = useState({ screen: 'title', eventIndex: 0, pos: 0 })

  // Switching platforms changes how many steps an event has — keep pos in range.
  useEffect(() => {
    setNav((n) => (n.pos > lastStep ? { ...n, pos: lastStep } : n))
  }, [lastStep])

  const goNext = useCallback(() => {
    setNav((n) => {
      if (n.screen === 'title') return { screen: 'event', eventIndex: 0, pos: 0 }
      if (n.screen === 'closing') return n
      if (n.pos < lastStep) return { ...n, pos: n.pos + 1 }
      if (n.eventIndex < LAST_EVENT) return { ...n, eventIndex: n.eventIndex + 1, pos: 0 }
      return { ...n, screen: 'closing' }
    })
  }, [lastStep])

  const goPrev = useCallback(() => {
    setNav((n) => {
      if (n.screen === 'closing') return { screen: 'event', eventIndex: LAST_EVENT, pos: lastStep }
      if (n.screen === 'title') return n
      if (n.pos > 0) return { ...n, pos: n.pos - 1 }
      if (n.eventIndex > 0) return { ...n, eventIndex: n.eventIndex - 1, pos: lastStep }
      return { screen: 'title', eventIndex: 0, pos: 0 }
    })
  }, [lastStep])

  const goToEvent = useCallback((eventIndex, pos = 0) => {
    setNav({ screen: 'event', eventIndex, pos })
  }, [])

  const goToScreen = useCallback((screen) => {
    setNav((n) => ({ ...n, screen }))
  }, [])

  return { nav, stepsPerEvent, goNext, goPrev, goToEvent, goToScreen }
}
