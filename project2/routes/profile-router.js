const express = require("express");
const router = express.Router();
const User = require("../models/user-model.js")

router.get("/user/profile", (req,res,next) => {
    res.render("./views/profile-page.hbs")
})