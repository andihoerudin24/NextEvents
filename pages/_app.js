import Head from 'next/head'
import Layout from '../components/layout/layout'
import '../styles/globals.css'
import { NotificationContextProvider } from '../store/notification-context'
function MyApp({ Component, pageProps }) {
  return (
     <NotificationContextProvider>
          <Layout>
               <Head>
                    <meta name="viewport" content="initial-scale1.0,widt=device-width"/>
               </Head>
               <Component {...pageProps} />
          </Layout>
     </NotificationContextProvider>
     
    )
}

export default MyApp
