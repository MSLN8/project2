const express = require("express");
const router = express.Router();
const User = require("../models/user-model.js")
const Stone = require("../models/stone-model.js")


///////////////////////////////////ADMIN ROUTE//////////////////////////////////////////////////////////
router.get("/usersmanagement", (req,res,next) =>{
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
router.get("/stonesmanagement", (req,res,next) =>{
  if (!req.user || req.user.role !== "admin") {
    req.flash ("error", "Only admins can do that");
    res.redirect ("/");
    return;
  }

Stone.find({ })
  .sort({role:1, createdAt: 1}) // use".sort()"" to order results
  .then(userResults => {
    res.locals.stoneArray = userResults;
    res.render("./admin-views/stones-list.hbs");
  })
.catch(err=>next(err));
});

//////////////////////////////////DELETE A STONE////////////////////////////////////////////////////// 

router.get('/stonesmanagement/:id/delete', (req, res, next) => {
  const {id} = req.params;
  Stone.findByIdAndRemove(id)
  .then(stoneDeleteResults => {
      res.redirect(`/stonesmanagement`);
  })
  .catch(err => next(err));
});

//////////////////////////////////DELETE A USER////////////////////////////////////////////////////// 
router.get('/usersmanagement/:id/delete', (req, res, next) => {
  const {id} = req.params;
  User.findByIdAndRemove(id)
  .then(userDeleteResults => {
      res.redirect(`/usersmanagement`);
  })
  .catch(err => next(err));
});

module.exports = router;