const passport = require ("passport");
const User = require ("../../models/user-model");
const GoogleStrategy = require ("passport-google-oauth").OAuth2Strategy


passport.use(new GoogleStrategy ({
    clientID:"785366078311-283uieecaea2o9670gtr8n0b2k0usuq2.apps.googleusercontent.com",
    clientSecret:"HF3jQLzfO92cXjAikVcf68Fo",
    callbackURL:"/google/user-info",
    proxy:true,
  }, (accessToken, refreshToken, userInfo, done) => {
      console.log("GOOGLE user info ------------------", userInfo);
      
      const {displayName, emails} = userInfo;
      
      User.findOne ({email : {$eq:emails[0].value}})
      .then(userDoc => {
        if (userDoc) {
          done(null, userDoc);
          return;
        }
      
      User.create({ fullName: displayName, email:emails[0].value})
        .then(userDoc => { 
          done(null, userDoc)
        })
        .catch(err => done(err));
      })
        .catch(err => done(err));
}));

  