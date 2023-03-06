import React, { Fragment } from "react";
// import { useRouter } from "next/router";
// import { getEventById } from "../../dummy-data";
import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage(props: any) {
  // const router = useRouter();
  // const eventId = router.query.eventId;
  const event = props.selectedEvent;
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>;
      </div>
    );
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

// To complete data fetching server-side before rendering
export async function getStaticProps(context: any) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return { props: { selectedEvent: event }, revalidate: 30 };
}

// Because there could be an infinity of eventId pages generated
// Tell for which ids the pages should be generated
export async function getStaticPaths() {
  // Need to fetch all possible events to propose here
  // const events = await getAllEvents();
  // Fetching only relevant events
  const events = await getFeaturedEvents();
  const paths = events.map((event: any) => {
    return { params: { eventId: event.id } };
  });
  // Fallback true if we want NextJS to generate dynamically an other page
  // Blocking to get the entire finished page right from the start
  return { paths: paths, fallback: "blocking" };
}

export default EventDetailPage;
