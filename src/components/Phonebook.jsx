import React, { useState, useEffect } from "react"
import Persons from "./Persons"
import Filter from "./Filter"
import PersonForm from "./PersonForm"
import axios from "axios"
import phonebookService from "../service/phonebook"

const Phonebook = () => {
  const [people, setPeople] = useState([])
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [filterList, setFilterList] = useState("")

  const hook = () => {
    phonebookService.getAll().then((list) => {
      // console.log(list)
      setPeople(list)
    })
  }
  // two params for useEffect, the [] ensure that this will only run on first render
  useEffect(hook, [])

  const handleFilterList = (event) => {
    // console.log(event.target.value)
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

  const addPerson = (event) => {
    event.preventDefault()
    const person = people.find((p) => p.name === name)
    if (person) {
      alert("this name already exists")
      const changedPerson = { ...person, number: number }

      phonebookService.updatePerson(changedPerson).then((returnedPerson) => {
        console.log(returnedPerson)
        setPeople(
          people.map((p) => (p.id !== returnedPerson.id ? p : returnedPerson))
        )
      })
    } else {
      const newPerson = {
        name: name,
        number: number,
        id: people.length + 1,
      }

      phonebookService.createNew(newPerson).then((returnedPerson) => {
        console.log(newPerson, "here")
        setPeople(people.concat(newPerson))
      })
    }
    // change both inputs to blank
    setName("")
    setNumber("")
  }

  const deletePerson = (id) => {
    console.log(id)
    window.confirm("Are you sure?")
    phonebookService.deletePerson(id).then((returnedData) => {
      setPeople(people.filter((p) => p.id !== id))
    })
  }

  return (
    <div>
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
            return (
              <Persons
                key={p.id}
                person={p}
                deleteProps={() => deletePerson(p.id)}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Phonebook
