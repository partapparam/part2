import React from "react"

const Detail = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <h3>{country.capital[0]}</h3>
    </div>
  )
}

export default Detail
