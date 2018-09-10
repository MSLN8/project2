const express = require('express');
const router  = express.Router();
const Stone = require("../models/stone-model.js")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});




/*GET Stone Description page */
router.get('/stone-description', (req, res, next)=>{
  Stone.find()
  .then(stoneResults => {
    res.locals.stonesArray = stoneResults;
  })
  res.render("stone-description.hbs")
});


module.exports = router;