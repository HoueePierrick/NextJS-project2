import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

function EventDetailPage() {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);
  if (!event) {
    return <p>No event found</p>;
  } else {
    return (
      <Fragment>
        <EventSummary title={event.title}></EventSummary>
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        ></EventLogistics>
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </Fragment>
    );
  }
}

export default EventDetailPage;
