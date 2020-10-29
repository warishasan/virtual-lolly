import React from "react"
import Lolly from '../components/lolly'
import Header from '../components/header'
import {navigate} from 'gatsby'
import DynamicLollyPage from '../components/dynamicLollyPage'

export default function NotFound({ location }) {


    console.log(location)
    console.log("HRE",location.href)
    console.log("GGG", location.pathname)
  return <div>

  <Header/>
  <div >
 
    yooo
  </div>

  </div>
}
