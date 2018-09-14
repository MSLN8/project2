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
        User.findById(req.user._id)
        .populate("possession")
        .then(userInfo => {
            res.locals.possessionArray = userInfo.possession;
            res.render("../views/profile-page.hbs");
        })
        .catch(err => next(err))
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
      res.redirect("/profile");
    })
    .catch (err => next(err));
  });
  

router.post("/stone-list", (req,res,next) =>{

    const stoneId = req.body.stoneId;
    const userId = req.user._id;

    User.findByIdAndUpdate(
        userId,
        { $push: { possession: stoneId }}
    )
    .then( userDoc => {
        //stone.find()
        //res.locals.stonesArray = userDoc;
        res.redirect("stone-list");
    })
    .catch(err => next(err));
});




module.exports = router;
