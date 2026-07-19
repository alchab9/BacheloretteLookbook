// Floating zoom controls for the desktop map. Calls the pan/zoom engine through
// the shared api ref; "overview" resets the camera to show the whole weekend.
export default function MapControls({ apiRef, onOverview }) {
  const zoomIn = () => apiRef.current?.zoomIn(0.4)
  const zoomOut = () => apiRef.current?.zoomOut(0.4)
  // Sync nav to the overview screen; the guided-zoom effect handles the camera reset.
  const overview = () => (onOverview ? onOverview() : apiRef.current?.resetTransform(600))

  return (
    <div className="map-controls">
      <button onClick={zoomIn} aria-label="Zoom in">＋</button>
      <button onClick={zoomOut} aria-label="Zoom out">－</button>
      <button onClick={overview} aria-label="Back to overview" title="Whole weekend">⤢</button>
    </div>
  )
}
