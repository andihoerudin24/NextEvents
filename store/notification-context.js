import React, { createContext,useState,useEffect } from 'react'

const notificationContext = createContext({
    notification:null,
    shownotification: (notificationData) =>{},
    hidenotification: (notificationData) =>{}
})

export const NotificationContextProvider = (props) =>{
   const [activeNotification,setactiveNotification] = useState()

   useEffect(()=>{
       if(activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')){
           const timer =  setTimeout(() => {
                setactiveNotification(null)
           },3000)
           return () =>{
               clearTimeout(timer)
           }
       }
   },[activeNotification])

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