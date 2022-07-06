import "./App.css"
import React from "react"
import Note from "./components/Note"
import { useState, useEffect } from "react"
import axios from "axios"
import Phonebook from "./components/Phonebook"
import Countries from "./components/Countries"
import noteService from "./service/notes"

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  // useEffect(() => {
  //   console.log("effect")
  //   axios.get("http://localhost:3001/notes").then((response) => {
  //     console.log(response)
  //     setNotes(response.data)
  //   })
  // }, [])

  const hook = () => {
    console.log("effect")
    noteService.getAll().then((initialData) => {
      // console.log(response)
      setNotes(initialData)
    })
  }
  useEffect(hook, [])

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3002/notes/${id}`
    const note = notes.find((n) => n.id === id)
    // spread operator copies the note, than we change the important value in that object
    // we create a clone note rather then passing in the existing note because we do not mutate state directly in React
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        // use map to create a copy of the old note into the new array SetNotes, plus the new note we just get back from response
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        console.log("there was an error" + id)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const addNote = (e) => {
    e.preventDefault()
    console.log("button clicked", e.target)
    // create new note object
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      setNewNote("")
    })
  }

  const handleNoteChange = (event) => {
    // event.preventDefault()
    // that function is not needed since it the event is on an input field, it would be need on a form
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          ></Note>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          onChange={handleNoteChange}
          type="text"
          placeholder="add new..."
          value={newNote}
        />
        <button type="submit"> Save </button>
      </form>
      <div>
        <Phonebook />
      </div>
      <Countries />
    </div>
  )
}

export default App
