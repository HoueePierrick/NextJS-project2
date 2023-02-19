import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/event-search";

function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year: any, month: any) {
    const fullPath = `/events/${year}/${month}`;
    // Navigating to this page
    router.push(fullPath);
  }
  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler}></EventsSearch>
      <EventList items={events}></EventList>
    </Fragment>
  );
}

export default AllEventsPage;
