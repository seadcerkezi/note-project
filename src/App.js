import "./App.css";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editNote, setEditNote] = useState();
  const [count, setCount] = useState(1);
  const [searchNote, setSearchNote] = useState("");
  const [activeNote, setActiveNote] = useState("");

  const handleTitle = (event) => {
    setNewTitle(event.target.value);
  };
  const handleText = (event) => {
    setNewText(event.target.value);
  };

  const addNote = () => {
    const myNote = { title: newTitle, text: newText, id: count };
    setNotes([...notes, myNote]);
    setNewTitle("");
    setNewText("");
    setCount((prev) => prev + 1);
  };

  const handleEdit = (task) => {
    setEditNote({ title: task.title, text: task.text, id: task.id });

    setEditModal(true);
  };

  const saveEdit = () => {
    console.log(editNote.text);
    setNotes(
      notes.filter((note) =>
        note.id !== editNote.id ? note : (note.text = newText)
      )
    );
    setEditModal(false);
    setNewText("");
  };

  const cancelEdit = () => {
    setEditModal(false);
    setNewText("");
  };

  const deleteNote = (taskName) => {
    setNotes(notes.filter((task) => task !== taskName));
  };

  const handleActiveNote = (task) => {
    console.log("handle active note called");
    setActiveNote(task);
  };

  return (
    <div className="App">
      <div className="left">
        <h2 className="header">
          <span>Notebook</span>
        </h2>
        <input
          className="search"
          onChange={(event) => {
            setSearchNote(event.target.value);
          }}
          type="text"
          placeholder="Search note..."
        />
        <div className="textAreas">
          <input
            onChange={handleTitle}
            value={newTitle}
            placeholder="Add Title"
          />
          <textarea
            rows={10}
            cols={30}
            onChange={handleText}
            value={newText}
            placeholder="Add Text"
          />
          <button
            disabled={newTitle.length === 0 || newText.length === 0}
            onClick={addNote}
          >
            Add
          </button>
        </div>
        <div>
          {notes
            .filter((val) => {
              if (searchNote == "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(searchNote.toLowerCase())
              ) {
                return val;
              }
            })
            .map((task, index) => (
              <div className="tasks" key={index}>
                <h1 onClick={() => handleActiveNote(task)}>{task.title}</h1>

                <p>{task.text.split(" ").slice(0, 3).join(" ")}...</p>
                <button className="cancel-btn" onClick={() => deleteNote(task)}>
                  X
                </button>
                <button className="edit-btn" onClick={() => handleEdit(task)}>
                  Edit
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="right">
        {activeNote ? (
          <div className="right-active">
            <h1>{activeNote.title}</h1>
            <p>{activeNote.text}</p>
          </div>
        ) : null}
      </div>
      {editModal && (
        <div className="blur">
          <div className="editModal">
            <h1>{editNote.title}</h1>
            <textarea
              onChange={handleText}
              rows={10}
              cols={30}
              placeholder="Edit note"
            ></textarea>
            <div>
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
