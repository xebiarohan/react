import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const params = useParams();

  return <>
  <h2>Event detail Page</h2>
  <h2>{params.eventId}</h2>
  </>;
}
