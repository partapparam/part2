import React, { useState, useEffect } from "react"
import Detail from "./Detail"

const Country = (props) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  }
  useEffect(() => {
    console.log("effect running")
    props.handleButtonProps(props.country.name.common)
  }, [clicked])
  return (
    <div>
      <li key={props.country.population}>{props.country.name.common} </li>
      <button onClick={handleClick}>Show</button>
      {props.showDetailProps === props.country.name.common &&
      clicked === true ? (
        <Detail country={props.country} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default Country
