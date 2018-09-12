const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const Stone = require("../models/stone-model.js");
const router = express.Router();
let arr;

////////////////////////ROUTE SEARCH////////////////////////////////////////////////////////
router.post("/search",(req,res,next) => {
  const {field} = req.body;
  if (field.length!==0) {
  arr = [];
  Stone.find()
    .then((stones) => {
    stones.forEach(oneStone => {
      if(oneStone.name.toLowerCase().includes(field.toLowerCase())) {
        arr.push(oneStone)
      }
      if(oneStone.power.toLowerCase().includes(field.toLowerCase())) {
        arr.push(oneStone)
      }
      if(oneStone.forWho.toLowerCase().includes(field.toLowerCase())) {
        arr.push(oneStone)
      }
    })
    if(arr.length===0) {
      res.redirect("/");
    }
    else {
      // res.locals.stoneResult = arr;
      res.redirect("/searchResults");
    }
  })
  .catch (err => next(err));
  }
else {
  res.redirect("/")
}
})

router.get("/searchResults",(req,res,next) => {
  res.locals.stoneResult = arr;
  res.render('searchResult.hbs');
});

module.exports = router;