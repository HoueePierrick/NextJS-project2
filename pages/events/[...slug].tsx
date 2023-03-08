import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
// import { getFilteredEvents } from "../../dummy-data";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FiltedEventsPage(props: any) {
  const [loadedEvents, setLoadedEvents] = useState<any>();
  // Runs after 1st rendering
  const router = useRouter();

  const filteredData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-course-1541c-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  );

  useEffect(() => {
    if (data) {
      const events: any[] = [];
      for (const key in data) {
        events.push({
          id: key,
          // Spread operator to copy the rest of the object
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    // Classname as a string as center is defined in the global CSS file
    return <p className="center">Loading</p>;
  }

  const filteredYear = filteredData![0];
  const filteredMonth = filteredData![1];

  const numYear: number = Number(filteredYear);
  const numMonth: number = Number(filteredMonth);

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
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

  const filteredEvents = loadedEvents.filter((event: any) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
  const filteredEvents = props.events;

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

  const date = new Date(props.date.year, props.date.month - 1);

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
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FiltedEventsPage;
