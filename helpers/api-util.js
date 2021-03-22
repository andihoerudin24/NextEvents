export const getAllEvents = async () => {
  const response = await fetch("https://next-js-course-62d48-default-rtdb.firebaseio.com/events.json");
  const data = await response.json();
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
};

export async function getFeaturedEvents() {
  const allevents = await getAllEvents();
  return allevents.filter((event) => event.isFeatured);
}

export const getEventById = async (id) => {
  const allevents = await getAllEvents();
  return allevents.find((event) => event.id === id);
};

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvent = await getAllEvents()

  let filteredEvents = allEvent.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}
