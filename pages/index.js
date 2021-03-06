import Head from 'next/head'

import {getFeaturedEvents} from '../helpers/api-util'
import EventList from '../components/events/events-list'
import NewsletterRegistration from '../components/input/newsletter-registration'
const HomePage = (props) => {
  return (
    <div>
         <Head>
             <title>NextJs Event</title>
             <meta name="description" content="find a lot of greet"/>
         </Head>
         <NewsletterRegistration/>
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
