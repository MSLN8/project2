const express = require('express');
const User = require("../models/user-model.js");
const router  = express.Router();
const Stone = require("../models/stone-model.js");

//////////ROUTE HOME PAGE/////////////////////////////////////////////////////////////////
router.get('/', (req, res, next) => {
  res.render('index');
});

//////////////ROUTE STONE DESCRIPTION PAGE ///////////////////////////////////////////////////////
router.get('/stone-description', (req, res, next)=>{
  Stone.find()
  .then(stoneResults => {
    res.locals.stonesArray = stoneResults;
  })
  res.render("stone-description.hbs")
});

/////////ROUTE SETTINGS///////////////////////////////////////////////////////////////////
// router.get("/settings",(req,res,next) => {
//   if (!req.user){
//     req.flash("error", "You have to be logged to visit user settings!")
//     res.redirect('/login');
//   }
//   else {
//     res.render("settings-page.hbs");
//   }
// });
// router.post("/process-settings",(req,res,next) => { 
//   const {fullName, email} = req.body;

//   User.findByIdAndUpdate(
//     req.user._id, //get the logged user's ID using Passport's "req.user"
//   { $set: {fullname, email} },
//   {runValidators:true},
//   )

//   .then (userDoc => {
//     req.flash("success", "settings saved!");
//     res.redirect("/");
//   })
//   .catch (err => next(err));
// });



module.exports = router;
