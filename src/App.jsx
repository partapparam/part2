import "./App.css"
import Note from "./components/Note"
import { useState } from "react"
import Phonebook from "./components/Phonebook"

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

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

    setNotes(notes.concat(noteObject))
    setNewNote("")
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
        import Phonebook from './components/Phonebook';
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note}></Note>
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
    </div>
  )
}

export default App
