import React from "react"

const PersonForm = (props) => {
  return (
    <input type="text" value={props.valueProp} onChange={props.onChangeProp} />
  )
}

export default PersonForm
