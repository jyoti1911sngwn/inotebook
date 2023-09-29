import React, { useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
import { useState } from "react";
const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, addNote } = context;
  const ref = useRef(null);
  const closeRef = useRef(null);
  const [note, setNote] = useState({
    id : " ",
    etitle: " ",
    edescription: " ",
    etag: " ",
  });

  const handleClick = (e) => {
    console.log("updating note" , note)
    // e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    closeRef.current.click();
    props.showAlert("Updated successfully", "success");

  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if(localStorage.getItem('token'))
    {getNotes();}
    else{
      navigate("/");
    }
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id : currentNote._id ,etitle: currentNote.title , edescription: currentNote.description , etag: currentNote.tag})
    props.showAlert("Updated successfully", "success");
  };

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      <span
        ref={ref}
        type="button"
        // className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></span>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Notes
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <h1>Add a Note</h1>
                <form className="container my-3">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      value={note.etitle}
                      name="etitle"
                      // aria-describedby="emailHelp"
                      onChange={onChange}
                      minLength={5} required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      onChange={onChange}
                      value = {note.edescription}
                      minLength={5}
                      required

                    />
                  </div>
                  <div className="mb-3 ">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      onChange={onChange}
                      value= {note.etag}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss= "modal">Close</button>
              <button
              disabled={ note.etitle.length<5 || note.edescription.length<5}
                type="button"
                className="btn btn-primary"
                // data-bs-dismiss="modal"
              onClick={handleClick}
              >
                Update Note
              </button>
             
            </div>
          </div>
        </div>
      </div>
      <div className=" row my-3">
        <h2>Your Notes</h2>
        {notes.length===0 && <div className = 'container mx-2'>No Notes To Display </div>}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
