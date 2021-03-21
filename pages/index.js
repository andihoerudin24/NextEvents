import {getFeaturedEvents} from '../helpers/api-util'
import EventList from '../components/events/events-list'

const HomePage = (props) => {
  return (
    <div>
        <EventList items={props.events}/>
    </div>
  );
};

export const getStaticProps = async (context) =>{
    const featuredEvent = await getFeaturedEvents()
    return{
      props:{
         events:featuredEvent
      },
      revalidate:1800
    }
}

export default HomePage;
