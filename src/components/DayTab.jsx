// Small chip showing the current day + event name and its emoji.
export default function DayTab({ event }) {
  return (
    <div className="day-tab">
      <span className="day-name">{event.day}</span>
      <span>·</span>
      <span>{event.event}</span>
      <span>{event.emoji}</span>
    </div>
  )
}
