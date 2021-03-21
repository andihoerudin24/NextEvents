import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

const EventDetailPage = (props) => {
  // const router = useRouter();
  // const eventid = router.query.eventid;
  const event = props.selectedEvent;
  //console.log('event',event)

  if (!event) {
    return (
        <div className="center">
            <p>loading...</p>
        </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  console.log("context", context);
  const eventId = context.params.eventid;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate:30
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
       params: { eventid: event.id },
  }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export default EventDetailPage;
