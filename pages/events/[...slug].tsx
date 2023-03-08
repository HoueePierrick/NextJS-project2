import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FiltedEventsPage(props: any) {
  // Runs after 1st rendering
  const router = useRouter();

  const filteredData = router.query.slug;
  if (!filteredData) {
    // Classname as a string as center is defined in the global CSS file
    return <p className="center">Loading</p>;
  }

  const numYear = Number(filteredData[0]);
  const numMonth = Number(filteredData[1]);

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date}></ResultsTitle>
      <EventList items={filteredEvents}></EventList>
    </Fragment>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const filteredData = params.slug;
  const numYear = Number(filteredData[0]);
  const numMonth = Number(filteredData[1]);

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      // Shows the 404 error page
      // notFound: true,
      // Other way, managing it inside our component
      props: { hasError: true },
      // Option for an automatic redirect
      // redirect: { destination: "/" }
    };
  }
  return { props: {} };
}

export default FiltedEventsPage;
