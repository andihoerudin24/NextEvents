import {getFeaturedEvents} from '../dummy-data'
import EventList from '../components/events/events-list'

const HomePage = () => {
  const featuredEvent = getFeaturedEvents()
  console.log(featuredEvent)
  return (
    <div>
        <EventList items={featuredEvent}/>
    </div>
  );
};
export default HomePage;
