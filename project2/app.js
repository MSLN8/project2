require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const flash        = require('connect-flash');

const passportSetup = require('./config/passport/passport-setup.js')

mongoose
  .connect('mongodb://localhost/project2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
hbs.registerPartials(__dirname+ "/views/partials");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(session({
  secret: "secret should be different for every app",
  saveUninitialized: true,
  resave:true,
  store : new MongoStore({mongooseConnection:mongoose.connection})
}));

passportSetup(app); 

app.use(flash());
app.use((req,res,next) => {
  //makes flash messages accesible inside hbs files as "messages"
  res.locals.messages = req.flash();
  next();
});


app.locals.title = 'GET STONED';


const index = require("./routes/index.js");
app.use('/', index);

const authRouter= require("./routes/auth-router.js");
app.use("/", authRouter);

const profileRouter= require("./routes/profile-router.js");
app.use("/", profileRouter);

const searchRouter = require("./routes/searchbar.js");
app.use("/", searchRouter);


const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const adminRouter = require("./routes/admin-router.js")
app.use("/", adminRouter);

module.exports = app;
