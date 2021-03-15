import {Fragment} from 'react'
import MainHedaer from './main-header'
const Layout = (props) =>{
    return(
        <Fragment>
             <MainHedaer/>
            <main>{props.children}</main>
        </Fragment>
    )
  
}

export default Layout