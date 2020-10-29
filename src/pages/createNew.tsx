import React, { useState, useRef } from "react"
import Lolly from "../components/lolly"
import Header from "../components/header"
import { navigate } from "gatsby"
import { useQuery, useMutation, gql } from "@apollo/client"
import { useFormik } from "formik"
import * as Yup from "yup"
import LollyColorChanger from '../components/lollyColorChanger'


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


  const formik = useFormik({
    initialValues: {
      recName: "",
      sendersName: "",
      message: "",
    },
    validationSchema: Yup.object({
      recName: Yup.string().required("Required") 
      .max(15, 'Must be 15 characters or less')
      ,
      sendersName: Yup.string().required("Required")
      .max(15, 'Must be 15 characters or less')
      ,
      message: Yup.string().required("Required"),
    }),
    onSubmit: values => {
     //console.log(values)

     const submitLollyForm = async () => {
      console.log("dpp")
  
      const result = await createLolly({
        variables: {
          recipientName: values.recName,
          sendersName: values.sendersName,
          message: values.message,
          flavorTop: colorTop,
          flavorMid: colorMid,
          flavorBot: colorBot,
        },
      })
  
      console.log(result)
    }

    submitLollyForm();
    
    },
  })

 

  const [createLolly] = useMutation(createLollyMutation)

  return (
    <div>
      <Header mainHeadingText = "Kuch Meetha Hojaye?" secondaryHeadingText = "Add Some Toppings, Add Some Love..." />

      <div className="editorRoot">
       <LollyColorChanger/>


        <form className="formContainer"  onSubmit={formik.handleSubmit} >
          <label className="formLabel" htmlFor="sendName">
            To:  
          </label>
          <div className = "formErrors" >{formik.errors.recName && formik.touched.recName
                        ? formik.errors.recName
                        : null}
          </div>
          <input
            className="inputText"
            type="text"
            name="recName"
            id="recName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            
          />
        

          <label className="formLabel" htmlFor="msg">
            Message:{" "}
          </label>
          <div className = "formErrors">{formik.errors.message && formik.touched.message
                        ? formik.errors.message
                        : null}
          </div>
          <textarea
            id = "message"
            name = "message"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="inputTextBox"
            cols={30}
            rows={15}
          />

          <label className="formLabel" htmlFor="Recname">
            {" "}
            From:{" "}
          </label>
          <div className = "formErrors">{formik.errors.sendersName && formik.touched.sendersName
                        ? formik.errors.sendersName
                        : null}
          </div>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="inputText"
            type="text"
            name="sendersName"
            id="sendersName"
          />
      
          <button
            className="submitButton"
            type="submit"
          >Send</button>
        </form>

      </div>
    </div>
  )
}
