import PhotoSlot from './PhotoSlot.jsx'

// One outfit inside an event = a row of three photos (Alex, Natalie, Together).
// Registers its DOM node so the map can fly-zoom the camera straight to it.
export default function OutfitGroup({ outfit, outfitNumber, isActive, registerRef }) {
  return (
    <div
      className={`outfit-group ${isActive ? 'active' : ''}`}
      ref={registerRef}
    >
      <div className="outfit-title">Outfit {outfitNumber}</div>
      <div className="outfit-photos">
        <PhotoSlot src={outfit.alex} role="alex" outfitNumber={outfitNumber} />
        <PhotoSlot src={outfit.natalie} role="natalie" outfitNumber={outfitNumber} />
        <PhotoSlot src={outfit.together} role="together" outfitNumber={outfitNumber} />
      </div>
    </div>
  )
}
