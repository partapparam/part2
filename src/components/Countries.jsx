import React, { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./Filter"
import Country from "./Country"
import Detail from "./Detail"

const Countries = () => {
  const [countries, setCountries] = useState([])
  const [showDetail, setShowDetail] = useState("false")
  const [filter, setFilter] = useState("")

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log(response.data)
      setCountries(response.data)
    })
  }
  useEffect(hook, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleButton = (name) => {
    console.log("button clicked", name)
    setShowDetail(name)
  }

  const countriesFilter =
    filter === ""
      ? []
      : countries.filter((c) => c.name.common.toLowerCase().includes(filter))

  const toShow = countriesFilter.length >= 10 ? [] : countriesFilter

  return (
    <div>
      <h1>Country List</h1>
      <div>
        <Filter filterListProp={filter} onChangeProps={handleFilter}></Filter>
      </div>
      <ul>
        {toShow.map((c) => {
          return (
            <Country
              key={c.population}
              country={c}
              showDetailProps={showDetail}
              handleButtonProps={(name) => handleButton(name)}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default Countries
