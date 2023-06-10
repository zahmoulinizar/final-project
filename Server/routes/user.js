const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("../midellwaires/isAuth");
const isAdmin = require("../midellwaires/isAdmin");
const cloudinary = require("../midellwaires/cloudinary");


// register
router.post("/register",async (req, res) => {
  let { userName, email, password, role ,image} = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "user already exist" });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;
    user = new User(req.body);
    await user.save();
    const token = await jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(201).json({token ,user});
  } catch (error) {
    res.status(404).json({message:error.message});
  }
});
//  login 
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "7 days",
    })
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// getting the auth user
router.get("/auth", isAuth, (req, res) => {
  try {
    const user = res.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
});
router.get("/profile" ,isAuth, async (req , res) => {
  try {
    const user = res.user ;
    res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json({message:error.message});
    
  }
  });

  // getting all user
router.get("/allUsers" ,isAuth, isAdmin, async (req ,res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json({message:'can not get user'})
  }
});

// updating user

router.put("/update", isAuth , async(req, res) => {
  const id = res.user._id
  const {email, userName,password,image} = req.body
  try {
    const user = await User.findById(id)
    const hashPassword = await bcrypt.hash(password, 10);
    user.email = email || user.email
    user.userName =userName || user.userName
    user.password =hashPassword || user.password
    if(image){
      const uploadRes =  await cloudinary.uploader.upload(image , {
           upload_preset:"online-shop"
       })
      const {public_id, secure_url} = uploadRes
      user.image = {public_id, secure_url}
  
    await user.save()
      }
    res.status(200).json({message:'user updated with success'})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

// deleting user 

router.delete('/delete' ,isAuth , isAdmin,async(req, res) => {
  try {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.status(200).json({message:'user deleted with success'})
    } catch (error) {
      res.status(500).json({message:error.message})
    }
 })
module.exports = router;
