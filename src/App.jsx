import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useIsMobile } from './hooks/useMediaQuery.js'
import { useJourneyNav } from './hooks/useJourneyNav.js'
import WeekendMap from './components/WeekendMap.jsx'
import SwipeDeck from './components/SwipeDeck.jsx'
import TitleOverlay from './components/TitleOverlay.jsx'
import ClosingOverlay from './components/ClosingOverlay.jsx'

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
          <WeekendMap nav={nav} goToEvent={goToEvent} />
          {nav.screen === 'event' && (
            <div className="map-hint">← → guided tour · drag to explore · click a disco ball</div>
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
