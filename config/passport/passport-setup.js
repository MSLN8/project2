const passport = require ("passport");
const User = require ("../../models/user-model");

require("./google-strategy.js");
passport.serializeUser((userDoc, done) => {
  done(null,userDoc._id);
});

passport.deserializeUser((userId, done) => {
  console.log ("Deserialize(retrieve user info from the DB")

User.findById(userId)
  .then(userDoc => {
    done(null, userDoc);
    })
  .catch(err => done(err));
});


function passportSetup(app){
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    next();
  });
}

module.exports = passportSetup;