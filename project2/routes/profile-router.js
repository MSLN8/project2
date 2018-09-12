const express = require("express");
const router = express.Router();
const Stone = require("../models/stone-model.js")
const User = require ("../models/user-model.js");

///////ROUTE PROFILE////////////////////////////////////////////////////////////////////////////////

router.get("/profile", (req,res,next) => {
    if (!req.user){
        req.flash("error", "You must be logged in to see your profile");
        res.redirect("/login");
    }
    else {
        res.render("../views/profile-page.hbs")
    }
})

router.post("/process-profile",(req,res,next) => { 
    const {fullName, email, location} = req.body;
    User.findByIdAndUpdate(
      req.user._id, //get the logged user's ID using Passport's "req.user"
    { $set: {fullName, email, location} },
    {runValidators:true},
    )
    .then (userDoc => {
      req.flash("success", "settings saved!");
      res.redirect("/");
    })
    .catch (err => next(err));
  });
  

module.exports = router;