const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body,    Result, validationResult } = require("express-validator");

//get all the notes GET API
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.json({ error: "internal server error1", message: error.message });
  }
});



router.post(
  "/addnote", fetchuser,
  [
    body("title", 'valid title').isLength({ min: 3 }),
    body("description", 'valid description').isLength({ min:3 }),
  ],

  async (req, res) => {
  try{

    const {title,description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
  title, description, tag, user: req.user.id
    })
    const savedNote = await note.save()
  res.json(savedNote)
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("internal")
  }
  })

// update note POST API
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  } 
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  let note = await Note.findById(req.params.id);
  if(!note){
    res.status(404).send("not found")
  }
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("not allowed");
  }
  note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
  res.json({note});
});
//put auth token n thunderclient before checking and add value of id by tracking it by another pi
//"/api/notes/"(id)""


//deleting the notes
//DELETE API
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    
    //tto be deleted
    let note = await Note.findById(req.params.id);
    if(!note){
      res.status(404).send("not found")
    }
    //allow delete only if user is owner(authenticated)
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("not allowed");
    }

    note = await Note .findByIdAndDelete(req.params.id)
    res.json({"success": "note is deleted" , note:note});
  });
module.exports = router;
