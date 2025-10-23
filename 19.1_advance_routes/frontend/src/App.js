import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as eventDeleteAction
} from "./pages/EventDetailPage.jsx";
import EventPage, { loader as eventsLoader } from "./pages/Events.js";
import NewEventPage, {action as newEventAction} from "./pages/NewEventPage.jsx";
import EditEventPage from "./pages/EditEventPage.jsx";
import Root from "./pages/Root.js";
import EventsRootLayout from "./pages/EventsRoot.js";
import ErrorPage from "./pages/Error.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: 'event-details',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventDeleteAction
              },
              { path: "edit", element: <EditEventPage /> },
            ]
          },
          { path: "new", element: <NewEventPage />, action: newEventAction },
        ],
      },
    ],
  },
]);


function App() {
  return (
    <RouterProvider router={router}>
      <div></div>
    </RouterProvider>
  );
}

export default App;
