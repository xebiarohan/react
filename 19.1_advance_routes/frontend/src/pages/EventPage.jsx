import { Link } from "react-router-dom";

const EVENTS = [
  {
    id: 1,
    name: "event1",
  },
  {
    id: 2,
    name: "event2",
  },
];

export default function EventPage() {
  return (
    <ul>
      {EVENTS.map((event) => (
        <li key={event.id}><Link to={`${event.id}`}>{event.name}</Link></li>
      ))}
    </ul>
  );
}
