import { useState } from 'react'
import { roleLabels } from '../data/journey.js'

const roleEmoji = { alex: '💃', natalie: '🕺', together: '👯' }

// One portrait (3:4) photo. Shows the real image when the file loads; otherwise a
// labelled dashed placeholder so the site works before any photos are dropped in.
export default function PhotoSlot({ src, role, outfitNumber, className = '' }) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed

  if (showImage) {
    return (
      <div className={`photo-slot ${className}`}>
        <img
          src={src}
          alt={`${roleLabels[role] ?? role} — Option ${outfitNumber}`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </div>
    )
  }

  return (
    <div className={`photo-slot placeholder ${className}`}>
      <span className="slot-emoji">{roleEmoji[role] ?? '📷'}</span>
      <span className="slot-label">{roleLabels[role] ?? role}</span>
      {outfitNumber ? <span className="slot-sub">Option {outfitNumber}</span> : null}
    </div>
  )
}
