import React, { createContext,useState } from 'react'

const notificationContext = createContext({
    notification:null,
    shownotification: (notificationData) =>{},
    hidenotification: (notificationData) =>{}
})

export const NotificationContextProvider = (props) =>{
   const [activeNotification,setactiveNotification] = useState()

   const shownotificationHandler = (notificationData) =>{
         setactiveNotification(notificationData)
   }

   const hidenotificationhandler = () =>{
         setactiveNotification(null)
   }

   const context = {
       notification:activeNotification,
       shownotification:shownotificationHandler,
       hidenotification:hidenotificationhandler
    }

   return (
       <notificationContext.Provider value={context}>
            {props.children}
       </notificationContext.Provider>
   )
}


export default notificationContext