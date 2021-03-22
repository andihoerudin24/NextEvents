import { getAllEvents } from "../../helpers/api-util"
import EventList from '../../components/events/events-list'
import EventSearch from "../../components/events/events-search"
import { Fragment } from "react"
import {useRouter} from 'next/router'

const AllEventsPage = (props) =>{
    const router = useRouter()
    const {events} = props
    console.log('events',events)
    const findEventsHandler = (year,month) =>{
       const fullpath = `/events/${year}/${month}`
       router.push(fullpath)
    }
    return(
        <Fragment>
            <EventSearch onSearch={findEventsHandler}/>
            <EventList items={events} />
        </Fragment>
    )
}

export const getStaticProps = async () =>{
     const events = await getAllEvents()
     return{
         props:{
             events:events
         },
         revalidate:60
     }
}

export default AllEventsPage