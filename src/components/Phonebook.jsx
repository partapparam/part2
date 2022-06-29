import React, { useState } from "react"
import Persons from "./Persons"
import Filter from "./Filter"
import PersonForm from "./PersonForm"

const Phonebook = () => {
  const [people, setPeople] = useState([
    { name: "Param", number: "615", id: 1 },
  ])
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [filterList, setFilterList] = useState("")

  const handleFilterList = (event) => {
    console.log(event.target.value)
    setFilterList(event.target.value)
  }
  // conditional statement to see if there is a filter present. If so, filter, if not show all.
  const peopleToShow =
    filterList === ""
      ? people
      : people.filter((p) => p.name.includes(filterList))

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const exist = (n) => {
    return people.filter((p) => {
      return p.name == n
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (exist(name).length !== 0) {
      alert("this name already exists")
    } else {
      const newPerson = {
        name: name,
        number: number,
        id: people.length + 1,
      }
      setPeople(people.concat(newPerson))
    }
    // change both inputs to blank
    setName("")
    setNumber("")
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        filterListProp={filterList}
        onChangeProps={handleFilterList}
      ></Filter>
      <div>
        <h2>Add New</h2>
        <form onSubmit={addPerson}>
          <div>
            Name :{" "}
            <PersonForm
              valueProp={name}
              onChangeProp={handleNameChange}
            ></PersonForm>
          </div>
          <div>
            Number:{" "}
            <PersonForm
              type="number"
              valueProp={number}
              onChangeProp={handleNumberChange}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
      <div>
        <ul>
          {peopleToShow.map((p) => {
            return <Persons key={p.id} person={p} />
          })}
        </ul>
      </div>
    </div>
  )
}

export default Phonebook
