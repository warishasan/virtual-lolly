import React, { useState, useRef } from "react"
import Lolly from "../components/lolly"
import Header from "../components/header"
import { navigate } from "gatsby"
import { useQuery, useMutation, gql } from "@apollo/client"

const GETDATA = gql`
  {
    hello
  }
`
const createLollyMutation = gql`
  mutation createLolly(
    $recipientName: String!
    $sendersName: String!
    $message: String!
    $flavorTop: String!
    $flavorMid: String!
    $flavorBot: String!
  ) {
    createLolly(
      recipientName: $recipientName
      sendersName: $sendersName
      message: $message
      flavorTop: $flavorTop
      flavorMid: $flavorMid
      flavorBot: $flavorBot
    ) {
      message
      lollyPath
    }
  }
`

export default function CreateNew() {
  const [colorTop, setcolorTop] = useState("#d52368")
  const [colorBot, setcolorBot] = useState("#deaa10")
  const [colorMid, setcolorMid] = useState("#e95946")
  const RecNameRef = useRef(null)
  const SenderNameRef = useRef(null)
  const msgRef = useRef(null)

  const submitLollyForm = async () => {
    console.log("dpp")

    const result = await createLolly({
      variables: {
        recipientName: RecNameRef.current.value,
        sendersName: SenderNameRef.current.value,
        message: msgRef.current.value,
        flavorTop: colorTop,
        flavorMid: colorMid,
        flavorBot: colorBot,
      },
    })

    console.log(result)
  }

  const { loading, error, data } = useQuery(GETDATA)
  const [createLolly] = useMutation(createLollyMutation)

  return (
    <div>
      <Header />

      <div className="editorRoot">
        <div className="LollyCreaterColorContainer">
          <Lolly
            style="lollipopEditor"
            lollyTop={colorTop}
            lollyBot={colorBot}
            lollyMid={colorMid}
          />

          <div className="colorSelectorContainer">
            <label htmlFor="topFlavor" className="colorPickerLabel">
              <input
                className="colorPicker"
                value={colorTop}
                type="color"
                name="topFlavor"
                id="topFlavor"
                onChange={e => {
                  setcolorTop(e.target.value)
                }}
              ></input>
            </label>
            
            <label htmlFor="midFlavor" className="colorPickerLabel">
              <input
                className="colorPicker"
                value={colorMid}
                type="color"
                name="midFlavor"
                id="midFlavor"
                onChange={e => {
                  setcolorMid(e.target.value)
                }}
              ></input>
            </label>

            <label htmlFor="botFlavor" className="colorPickerLabel">
              <input
                className="colorPicker"
                value={colorBot}
                type="color"
                name="botFlavor"
                id="botFlavor"
                onChange={e => {
                  setcolorBot(e.target.value)
                }}
              ></input>
            </label>
          </div>
        </div>

        <div className = "formContainer">
          <label className = "formLabel" htmlFor="sendName">To: </label>
          <input className = "inputText"
            type="text"
            name="sendName"
            id="sendName"
            ref={SenderNameRef}
          />

          <label  className = "formLabel" htmlFor="msg">Message: </label>
          <textarea  className = "inputTextBox" cols={30} rows={15} ref={msgRef} />

          <label  className = "formLabel" htmlFor="Recname"> From: </label>
          <input className = "inputText" type="text" name="Recname" id="Recname" ref={RecNameRef} />
          <input className = "submitButton" onClick={submitLollyForm} type="button" value="Send"></input>

        </div>
      </div>
    </div>
  )
}
