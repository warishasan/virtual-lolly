import React from "react"
//import {graphql} from 'gatsby';
import {Link,graphql,useStaticQuery} from 'gatsby';



export const query = graphql`
query MyQuery($lollyPath:String!) {
    LOLLIES {
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
  }
  
  
`


export default function DynamicLollyPage({data}) {

    

console.log(data);


    return(
        <div>Dynamic page</div>
    )

}


