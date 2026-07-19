import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useIsMobile } from './hooks/useMediaQuery.js'
import { useJourneyNav } from './hooks/useJourneyNav.js'
import WeekendMap from './components/WeekendMap.jsx'
import SwipeDeck from './components/SwipeDeck.jsx'
import TitleOverlay from './components/TitleOverlay.jsx'
import ClosingOverlay from './components/ClosingOverlay.jsx'
import DayBadge from './components/DayBadge.jsx'
import { events } from './data/journey.js'

export default function App() {
  const isMobile = useIsMobile()
  const { nav, goNext, goPrev, goToEvent, goToScreen } = useJourneyNav(isMobile)

  // Keyboard drives both platforms: → / ↓ advance, ← / ↑ reverse. On desktop this
  // is the guided tour that flies the camera along the trail.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  return (
    <>
      {isMobile ? (
        <SwipeDeck
          nav={nav}
          goNext={goNext}
          goPrev={goPrev}
          goToEvent={goToEvent}
          goToScreen={goToScreen}
        />
      ) : (
        <>
          <WeekendMap nav={nav} goToEvent={goToEvent} goToScreen={goToScreen} />
          {nav.screen === 'event' && (
            <>
              {/* Hide the badge at the title/description beat (pos 1) so the big
                  centered day title is unobstructed; it returns at Outfit 1. */}
              {nav.pos !== 1 && (
                <DayBadge
                  day={events[nav.eventIndex].day}
                  event={events[nav.eventIndex].event}
                />
              )}
              <div className="map-hint">← → guided tour · drag to explore · click a disco ball</div>
            </>
          )}
          {nav.screen === 'overview' && (
            <div className="map-hint">→ start the tour · drag to explore · click a disco ball</div>
          )}
        </>
      )}

      <AnimatePresence>
        {nav.screen === 'title' && (
          <TitleOverlay key="title" onStart={goNext} />
        )}
        {nav.screen === 'closing' && (
          <ClosingOverlay
            key="closing"
            onRestart={() => goToScreen('title')}
            onBack={goPrev}
          />
        )}
      </AnimatePresence>
    </>
  )
}
