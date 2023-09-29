import React, { useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const About = () => {
  //const a = useContext("noteContext");
  
  // useEffect(() => {
  //   a.update();
  // }, []);
  return <div>
    {/* {a.name} */}Create and Save your notes for future reference.
    </div>;
};

export default About;
