import React from "react";
import noteContext from "../context/notes/noteContext"
import { useContext } from "react";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { note, updateNote } = props;
  const customImageStyles = {
    marginRight: '1.5rem', // Override margin-right
    marginLeft: '10.5rem',
  };
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>

          <img
            src={process.env.PUBLIC_URL + "/trash-can-solid.svg"}
            alt="SVG Image"
            width="25" // Change this to your desired width
            height="50"
            className="mx-2"
            style={customImageStyles}
            onClick={()=>{
              deleteNote(note._id);
              props.showAlert("Deleted successfully", "success");

            }}
          />
          <img
            src={process.env.PUBLIC_URL + "/pen.svg"}
            alt="SVG Image"
            width="25" // Change this to your desired width
            height="50"
            className="mx-4"
            style={customImageStyles}
            onClick={()=>{updateNote(note);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
