import { useCallback, useEffect, useState } from 'react'
import { events } from '../data/journey.js'

const LAST_EVENT = events.length - 1

// Shared navigation for both platforms.
//
// Desktop guided tour is a multi-level zoom. `pos` within an event means:
//   pos 0 → whole event (ball + title + caption + all 3 outfits)
//   pos 1 → title & description (the disco ball, event name, and caption)
//   pos 2 → Outfit 1 row   pos 3 → Outfit 2 row   pos 4 → Outfit 3 row
// and there's an `overview` screen (the whole weekend) before event 1.
//
// Mobile is the swipe deck: `pos` 0–8 is the photo within the event, no overview.
export function useJourneyNav(isMobile) {
  const stepsPerEvent = isMobile ? 9 : 5
  const lastStep = stepsPerEvent - 1

  const [nav, setNav] = useState({ screen: 'title', eventIndex: 0, pos: 0 })

  // Switching platforms changes how many steps an event has — keep pos in range.
  useEffect(() => {
    setNav((n) => (n.pos > lastStep ? { ...n, pos: lastStep } : n))
  }, [lastStep])

  const goNext = useCallback(() => {
    setNav((n) => {
      if (n.screen === 'title') {
        // Desktop starts at the overview; mobile jumps straight to event 1.
        return isMobile
          ? { screen: 'event', eventIndex: 0, pos: 0 }
          : { screen: 'overview', eventIndex: 0, pos: 0 }
      }
      if (n.screen === 'overview') return { screen: 'event', eventIndex: 0, pos: 0 }
      if (n.screen === 'closing') return n
      if (n.pos < lastStep) return { ...n, pos: n.pos + 1 }
      if (n.eventIndex < LAST_EVENT) return { ...n, eventIndex: n.eventIndex + 1, pos: 0 }
      return { ...n, screen: 'closing' }
    })
  }, [isMobile, lastStep])

  const goPrev = useCallback(() => {
    setNav((n) => {
      if (n.screen === 'closing') return { screen: 'event', eventIndex: LAST_EVENT, pos: lastStep }
      if (n.screen === 'overview') return { screen: 'title', eventIndex: 0, pos: 0 }
      if (n.screen === 'title') return n
      if (n.pos > 0) return { ...n, pos: n.pos - 1 }
      if (n.eventIndex > 0) return { ...n, eventIndex: n.eventIndex - 1, pos: lastStep }
      return isMobile
        ? { screen: 'title', eventIndex: 0, pos: 0 }
        : { screen: 'overview', eventIndex: 0, pos: 0 }
    })
  }, [isMobile, lastStep])

  const goToEvent = useCallback((eventIndex, pos = 0) => {
    setNav({ screen: 'event', eventIndex, pos })
  }, [])

  const goToScreen = useCallback((screen) => {
    setNav((n) => ({ ...n, screen }))
  }, [])

  return { nav, stepsPerEvent, goNext, goPrev, goToEvent, goToScreen }
}
