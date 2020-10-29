import React from "react"
import Lolly from '../components/lolly'
import Header from '../components/header'
import {navigate} from 'gatsby'
import DynamicLollyPage from '../components/dynamicLollyPage'
import { useQuery, useMutation, gql } from "@apollo/client"


const GET_LOLLY_BY_PATH = gql`
query getLollies($lollyPath:String!) {
      getLollyByPath(lollyPath: $lollyPath) {
        flavorBot
        flavorMid
        flavorTop
        lollyPath
        message
        recipientName
        sendersName
    }
  }
  

`


export default function NotFound({ location }) {

  const { loading, error, data } = useQuery(GET_LOLLY_BY_PATH, {
    variables: { lollyPath: "e7LNMITJ3" },
  });
    console.log(location)
    console.log("HRE",location.href)
    console.log("GGG", location.pathname)

    console.log(data);
  return <div>

  <Header/>
  <div >
 
    yooo I am 404
  </div>

  </div>
}
