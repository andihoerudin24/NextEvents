import { getAllEvents } from "../../dummy-data"
import EventList from '../../components/events/events-list'
import EventSearch from "../../components/events/events-search"
import { Fragment } from "react"
import {useRouter} from 'next/router'

const AllEventsPage = () =>{
    const router = useRouter()
    const events = getAllEvents()
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

export default AllEventsPage