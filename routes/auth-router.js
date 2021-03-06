const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user-model.js');
const passport = require("passport");
// const flash = require('connect-flash');

///////////ROUTE SIGN UP/////////////////////////////////////////////////////////////////////
router.get("/signup", (req,res,next) => {
 res.render("./auth-views/signup-form.hbs");
});

router.post("/process-signup", (req,res,next) => {
 const {fullName, email, originalPassword, zodiac, location} = req.body;
 let possession = [];
 //Encrypt the submitted password
 const encryptedPassword= bcrypt.hashSync(originalPassword, 10);

 User.create ({fullName, email, encryptedPassword, possession, zodiac, location})
 .then(userDoc => {
   req.flash("success", "Sign up success! 🎉🎉🎉");
   res.redirect("/");
   })
 .catch(err => next(err));
});




///////////ROUTE LOG IN/////////////////////////////////////////////////////////////////////
router.get("/login", (req,res,next)=> {
 res.render("./auth-views/login-form")
});

router.post("/process-login", (req, res, next) => {
 const {email, originalPassword} = req.body;
 User.findOne({email : {$eq:email}})
 .then(userDoc => {
   if (!userDoc){
     req.flash("error", "Incorrect email 💔💔💔");
     res.redirect("/login");
     return; // use "return instead of a big else {}"
   }
     const {encryptedPassword} = userDoc;
     if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
       req.flash("error", "Incorrect password 💔💔💔");
       res.redirect("/login");
       return;
     }
     req.logIn(userDoc, () => {
     req.flash("success", "Congrats you're logged in! 🍾🍾🍾");
     res.redirect("/");
     })

   })

 .catch (err => next(err));
   });

///////////ROUTE LOG OUT/////////////////////////////////////////////////////////////////////
   router.get("/logout", (req,res,next) => {
     req.logOut();
     req.flash("success", "See you later! 👋👋👋");
     res.redirect("/");
   });

///////////ROUTE GOOGLE LOG IN///////////////////////////////////////////////////////////////
   router.get("/google/login", passport.authenticate("google", {
     scope: [
       "https://www.googleapis.com/auth/plus.login",
       "https://www.googleapis.com/auth/plus.profile.emails.read",
      ]
    }));
    
    console.log("blah"),
   router.get("/google/user-info",
   passport.authenticate("google", {
   successRedirect : "/",
   successFlash:" Congrats you're logged in with Google 🍾🍾🍾",
   failureRedirect: "/login",
   failureFlash: "Google log in failed! 😭😭😭",
   }));


module.exports = router;