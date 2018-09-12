const express = require("express");
const router = express.Router();
const Stone = require("../models/stone-model.js")

router.get("/profile", (req,res,next) => {
    if (!req.user){
        req.flash("error", "You must be logged in to see your profile");
        res.redirect("/login");
    }
    else {
        res.render("../views/profile-page.hbs")
    }
})
   
/////////////MY STONES PART///////////////////////////////////////////////////////////////
//     Stone.find({ owner : {$eq: req.user._id} })
//     .sort({createdAt : -1})
//     .then(stoneResults => {
//       res.locals.stonesArray = stoneResults;
//       res.render("views/profile-page.hbs");
//     })
//     .catch(err => next(err));
// });

// router.get("/profile/add", (req,res,next) => {
//     if(!req.user){
//         req.flash("error", "You must be logged in to add a stone")
//         res.redirect("/login");
//     }
//     else {
//     res.render("views/stone-form.hbs");
//     }
// });

// router.post("/process-stone", (req,res,next) => {
//   const {name, description, pictureUrl} = req.body;
//   const owner = req.user._id;

// Stone.create({name, description, image})
//   .then(stoneDoc => {
//     req.flash("success", "Stone created successfully")
//     res.redirect("/my-profile")
//   })
//   .catch(err => next (err));
// });

module.exports = router;