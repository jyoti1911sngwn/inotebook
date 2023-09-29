const express = require("express");
const mongoose = require("mongoose");


const User = require("../models/User");
const router = express.Router();
const app = express();
const bcrypt = require("bcryptjs");
var fetchuser =require('../middleware/fetchuser');
const JWT_SECRET = "helloinsideMERNtoDay"; //JSON web token - secure communication btw client and server
// Add JSON body parsing middleware
// app.use(express.json());
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
//create a user by POST - "/api/auth" (endpoint h  ye) --doesnt require authentication


//create a user
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success= false;
    //   const user =User(req.body);
    //   user.save()
    //   res.send(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const {email, password} =req.body;
    try{ 
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "user exists" });
      }
      
      const salt = await bcrypt.genSalt(10);
      
      const secPas = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPas,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken); //
      success = true;
      res.json({success, authtoken});
    }
    
    catch(err){
      console.log(err);
      res.json({ error: "please enter a unique val", message: err.message });
    }
  }
);



//authenticate a user
router.post(
  "/login",
  [
    body("email", "enter alid email").isEmail(),
    body("password", "cant be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try{let user = await User.findOne({email});
    if(!user){
      success= false
      return res.status(400).json({ error:"Sorry user doesnot  exist"});
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      success  =false
      return res.status(400).json({success, error: "user doesnt exit"})
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken})
    }catch(error){
          console.log(err);
          res.json({ error:"internal server error", message: error.message });
        };
    
      

      })



      //user logged in detail  "/api/auth/getuser"
      router.post(
        "/getuser", fetchuser,
        async (req, res) => {

      try{
        userId = req.user.id;
        const user= await User.findById(userId).select("-password")
        res.send(user)
      }
      catch(error){
      
          console.error(error.message);
          res.status(500).send("Inetrenal server error");
        }
        })
module.exports = router
