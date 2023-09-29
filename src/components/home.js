import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext"
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Noteitem from "./Noteitem";
import Notes from "./Notes";
import AddNote from "./AddNote";
const Home = (props) => {
  const {showAlert} =props
  const context = useContext(noteContext);
  // eslint-disable-next-line
  const {notes, setNotes} = context;
  return (
    <div>
      
      <Notes showAlert={showAlert}/>
    </div>
  );
};

export default Home;
