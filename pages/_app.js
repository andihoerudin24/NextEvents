import Head from 'next/head'
import Layout from '../components/layout/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
     <Layout>
           <Head>
                <meta name="viewport" content="initial-scale1.0,widt=device-width"/>
           </Head>
          <Component {...pageProps} />
     </Layout>
    )
}

export default MyApp
