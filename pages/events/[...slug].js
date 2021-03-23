import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/events-list";
import ResultsTitle from "../../components/events/results-title";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from 'swr'
import React,{useState,useEffect} from 'react'
import Head from 'next/head'
const FilteredEventsPage = (props) => {
  const [events,setevents] = useState('')
  const router = useRouter();

  const filterData = router.query.slug;

  const {data,error}  = useSWR('https://next-js-course-62d48-default-rtdb.firebaseio.com/events.json')
  console.log('data',data)
  useEffect(()=>{
      if(data){
        const events = [];
        for (const key in data) {
          events.push({
            id: key,
            ...data[key],
          });
        }
        setevents(events)
      }
  },[data])


  let pageHeadData = <Head>
     
         <title>Filter EVENTS</title>
         <meta name="description" content={`All Event list`}/>
  </Head>

  if (!events) {
     return (
          <Fragment>
               {pageHeadData}
              <p className="center">loading ....</p>
          </Fragment>
        );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;


  pageHeadData = (
    <Head>
         <title>Filter EVENTS</title>
         <meta name="description" content={`All Event for ${numMonth}/${numYear}`}/>
    </Head>
  )
  
  
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid Filter, Please Adjust yout values !</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  let filterdEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  if (!filterdEvents || filterdEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
       {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filterdEvents} />
    </Fragment>
  );
};

// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   console.log('params',params)

//   const filtedData = params.slug;
//   console.log('filtedData',filtedData)

//   const filteredYear = filtedData[0];
//   const filteredMonth = filtedData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }
//   const filterdEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });
//   return {
//     props: {
//       events: filterdEvents,
//       date:{
//         year:numYear,
//         month:numMonth
//       }
//     },
//   };
// };

export default FilteredEventsPage;
