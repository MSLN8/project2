const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require ('../models/user-model.js');
const passport = require ("passport");




///////////ROUTE SIGN UP/////////////////////////////////////////////////////////////////////
router.get("/signup", (req,res,next) => {
res.render("./auth-views/signup-form.hbs");
});

router.post("/process-signup", (req,res,next) => {
  const {name, email, originalPassword, zodiacSign, location} = req.body;
  //Encrypt the submitted password
  const encryptedPassword= bcrypt.hashSync(originalPassword, 10);

  User.create ({name, email, encryptedPassword, zodiacSign, location})
  .then(userDoc => {
    req.flash("error", "Incorrect email");
    res.redirect("/");
    })
  .catch(err => next(err));
});


///////////ROUTE LOG IN/////////////////////////////////////////////////////////////////////
router.get("/login", (req,res,next)=> {
  res.render("./auth-views/login-form.hbs")
});

router.post("/process-login", (req, res, next) => {
  const {email, originalPassword} = req.body;

  // Fist check to see if there's a document with that email
  User.findOne({email : {$eq:email}})
  .then(userDoc => {
    if (!userDoc){
      // save a flash message to display in the LOGIN page
      req.flash("error", "Incorrect email");
      res.redirect("./login");
      return; // use "return instead of a big else {}"
    }

      // second check the password
      const {encryptedPassword} = userDoc;

      // "compareSync()" will return false if the "originalPassword" is wrong
      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        req.flash("error", "Incorrect password");
        res.redirect("./login");
        return;
      }

      //LOG IN THIS USER
      // "req.logIn()" is a passport method that triggers "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userDoc, () => {
      //save a flash message to display in the HOME page
      req.flash("success", "Log in success!");
      // go to the home page if password is good (log in worked!)
      res.redirect("/");
      })
           
    })

  .catch (err => next(err));
    });

    router.get("/logout", (req,res,next) => {
      //req.logOut() is a Passport method that removes the user ID from session
      req.logOut();
      req.flash("success", "Logged out succesfully");
      res.redirect("/");
    });

    router.get("/slack/login", passport.authenticate("slack"));

    router.get("/slack/user-info",
      passport.authenticate("slack", {
        successRedirect: "/",
        successFlash:"Slack log in successful ! ",
        failureRedirect: "/login",
        failureFlash: "Slack log in failed !",
    }));

    router.get("/google/login", passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/plus.profile.emails.read",
        ]
    }));

    router.get("/google/user-info",
    passport.authenticate("google", {
    successRedirect : "/",
    successFlash:"Google log in successful ! ",
    failureRedirect: "/login",
    failureFlash: "Google log in failed !",
    }));

module.exports = router;