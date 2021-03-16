import Button from '../ui/button'
import classes from './event-item.module.css'
import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'
const EventItem = (props) =>{
    const {title,image,date,location,id} = props
    console.log('title',title)
    const humandReadableDate = new Date(date).toLocaleDateString('id-ID',{
        day: 'numeric',
        month:'long',
        year:'numeric'
    })
    const formatedAddres = location.replace(', ', '\n')
    const explorLink = `/events/${id}`

    return(
        <li className={classes.item}>
            <img src={'/' + image} alt={title} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                         <DateIcon/>
                        <time>{humandReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon/>
                        <address>{formatedAddres}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={explorLink}>
                        <span>Expolore Event</span>
                        <span className={classes.icon}><ArrowRightIcon/></span>
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem