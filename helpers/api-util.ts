export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-course-1541c-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  );
  const data = await response.json();
  const events: any[] = [];
  for (const key in data) {
    events.push({
      id: key,
      // Spread operator to copy the rest of the object
      ...data[key],
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id: any) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
