import PhotoSlot from './PhotoSlot.jsx'

// One outfit inside an event = a row of three photos (Alex, Natalie, Together).
// The active outfit is highlighted in place (the camera stays on the event).
export default function OutfitGroup({ outfit, outfitNumber, isActive, registerRef }) {
  return (
    <div className={`outfit-group ${isActive ? 'active' : ''}`} ref={registerRef}>
      <div className="outfit-title">Option {outfitNumber}</div>
      {outfit.warning && (
        <div className="outfit-warning">⚠️ {outfit.warning}</div>
      )}
      <div className="outfit-photos">
        <PhotoSlot src={outfit.alex} role="alex" outfitNumber={outfitNumber} />
        <PhotoSlot src={outfit.natalie} role="natalie" outfitNumber={outfitNumber} />
        <PhotoSlot src={outfit.together} role="together" outfitNumber={outfitNumber} />
      </div>
    </div>
  )
}
