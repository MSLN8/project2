const express = require("express");
const router = express.Router();
const User = require("../models/user-model.js")
const Stone = require("../models/stone-model.js")

router.get("/user/profile", (req,res,next) => {
    res.render("./views/profile-page.hbs")
})

//////////ADD A STONE TO USER/////////////////////////////////////////////////////////////////////////
router.get("/process-add"), (req, res, next) => {
    const {name, image} = req.body
    const stone = req.user._id;
} 
Stone.push(req.body)
.then(addDoc => {
    res.redirect("/stone-list")
}

)
.catch(err => next(err));