import React,{useState} from "react"
import Lolly from './lolly'

export interface props{
    lollyTop?: string
    lollyMid?: string
    lollyBot?: string
}

export default function LollyColorChanger(props:props) {

    const [colorTop, setcolorTop] = useState(props.lollyTop)
    const [colorBot, setcolorBot] = useState(props.lollyBot)
    const [colorMid, setcolorMid] = useState(props.lollyMid)

  return (
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
  )
}

LollyColorChanger.defaultProps = {lollyTop : "#d52368", lollyMid : "#e95946", lollyBot : "#deaa10"}
