const express = require('express');
const User = require("../models/user-model.js");
const router  = express.Router();
const Stone = require("../models/stone-model.js");

//////////ROUTE HOME PAGE/////////////////////////////////////////////////////////////////
router.get('/', (req, res, next) => {
  res.render('index');
});

//////////////ROUTE STONE LIST///////////////////////////////////////////////////////
router.get('/stone-list', (req, res, next)=>{
  Stone.find()
  .then(stoneResults => {
    res.locals.stonesArray = stoneResults;
  res.render("stone-list.hbs")
})
.catch(err => next(err))
});

//////////////ROUTE GET STONE INFO ///////////////////////////////////////////////////////
router.get('/stone-description/:stoneId', (req, res, next) => {
  const {stoneId} = req.params
  Stone.findById(stoneId)
  .then( stoneDoc => {
    res.locals.oneStone = stoneDoc
    res.render("stone-description")
  })
  .catch(err => next(err));
})



/////////ROUTE SETTINGS///////////////////////////////////////////////////////////////////
router.get("/settings",(req,res,next) => {
  if (!req.user){
    req.flash("error", "You have to be logged to visit user settings!")
    res.redirect('/login');
  }
  else {
    res.render("profile-page.hbs");
  }
});
router.post("/process-settings",(req,res,next) => { 
  const {fullName, email} = req.body;

  User.findByIdAndUpdate(
    req.user._id, //get the logged user's ID using Passport's "req.user"
  { $set: {fullname, email} },
  {runValidators:true},
  )

  .then (userDoc => {
    req.flash("success", "settings saved!");
    res.redirect("/profile");
  })
  .catch (err => next(err));
});



module.exports = router;
