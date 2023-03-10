// import { getFeaturedEvents } from "../dummy-data";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

function HomePage(props: any) {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={props.events}></EventList>
    </div>
  );
}

export async function getStaticProps(context: any) {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    // Re-generate this page every 30 minutes for every new request
    revalidate: 1800,
  };
}

export default HomePage;
