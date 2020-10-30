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
    variables: { lollyPath: location.href },
  });
    console.log(location)
    console.log("HRE",location.href)
    console.log("GGG", location.pathname)

    console.log(data);
    console.log(error)
  return <div>

{!!data ? 
<div>

<Header mainHeadingText = "Kuch Meetha Hojaye?" secondaryHeadingText = "You recieved a lolly, dont eat it alone !" />
<h5 className = "sharableLinkContainer" >Your sharable link: </h5> <span className = "sharableLink" > {`https://sharelolly.netlify.app/lollies/${data.getLollyByPath.lollyPath}`}</span>
<div className = "recievedContentContainer">
<Lolly style = "lollyRecieved" lollyTop = {data.getLollyByPath.flavorTop}  lollyMid = {data.getLollyByPath.flavorMid}  lollyBot = {data.getLollyByPath.flavorBot}/>

<div className = "recievedTextContainer">

  <h3>HI {data.getLollyByPath.recipientName.toUpperCase()}</h3>
<p>{data.getLollyByPath.message}</p>
<h4>From: {data.getLollyByPath.sendersName}</h4>
</div>
</div>
</div>

:
<div className = "pageNotFound">
  
  
404. Page not found.  
  
</div>}
  </div>
}
