const express = require("express");
const router = express.Router();
const User = require("../models/user-model.js")
const Stone = require("../models/stone-model.js")


///////////////////////////////////ADMIN ROUTE//////////////////////////////////////////////////////////
router.get("/admin/usersmanagement", (req,res,next) =>{
  if (!req.user || req.user.role !== "admin") {
    req.flash ("error", "Only admins can do that");
    res.redirect ("/");
    return;
  }
//////////////////////////////////LISTE DES USERS////////////////////////////////////////////////////// 
  User.find({ })
    .sort({role:1, createdAt: 1}) // use".sort()"" to order results
    .then(userResults => {
      res.locals.userArray = userResults;
      res.render("./admin-views/user-list.hbs");
    })
    .catch(err=>next(err));
});

//////////////////////////////////LISTE DES STONES////////////////////////////////////////////////////// 
router.get("/admin/stonesmanagement", (req,res,next) =>{
  if (!req.user || req.user.role !== "admin") {
    req.flash ("error", "Only admins can do that");
    res.redirect ("/");
    return;
  }

Stone.find({ })
  .sort({role:1, createdAt: 1}) // use".sort()"" to order results
  .then(userResults => {
    res.locals.stoneArray = userResults;
    res.render("./admin-views/stone-list.hbs");
  })
.catch(err=>next(err));
});

module.exports = router;