import {Fragment,useContext} from 'react'
import MainHedaer from './main-header'
import Notification from '../notification/notification'
import notificationContext from '../../store/notification-context'

const Layout = (props) =>{
    const notificationctx = useContext(notificationContext)
    const activenotification = notificationctx.notification;
    return(
        <Fragment>
             <MainHedaer/>
            <main>{props.children}</main>
            {activenotification && (<Notification title={activenotification.title} message={activenotification.message} status={activenotification.status} /> )}
        </Fragment>
    )
  
}

export default Layout