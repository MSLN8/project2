
const mongoose = require("mongoose");
const Stone = require("../models/stone-model.js");
const User = require ("../models/user-model.js")
const bcrypt = require("bcrypt");


//process.env.MONGODB_URI
//////////////////Connection to Mongoose////////////////////////////
mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


//////////////////Data creation in Mongo////////////////////////////
  const stoneData = [
    {name: "Amethyst",
     image: "https://bit.ly/2MgKMCX",
     power: "Purifying the mind and clearing it of negative thoughts",
     forWho: "Sagittarius, Capricorn, Virgo, Aquarius, Pisces",
    },
    {name: " Clear quartz",
    image: "https://bit.ly/2Mk0Rrx",
    power: "Regulates emotions, detangles the energy nodes ",
    forWho: "Gemini, Cancer, Virgo, Capricorn, Aquarius, Pisces",
   },
    {name: "Citrine",
    image: "http://www.holisticproductsireland.com/image/cache/data/Crystals/tumble%20stones/Citrine-700x700.jpg",
    power: " Improves creativity, reduces anxiety and stress",
    forWho: "Zodiac stone for pisces",
  },
    {name: "Black Tourmaline",
    image: "https://bit.ly/2wZcJta",
    power: "Brings stability, restores self-confidence, drives out unwanted thoughts",
    forWho: "Cancer, Sagittarius, Capricorn",
 },
    {name: "Carnelian",
    image: "https://www.healthyheights.com.au/uploads/4/8/2/5/48253503/s141420892835886154_p766_i1_w1500.jpeg",
    power: "Brings dynamism. Fights sadness and gloom",
    forWho: "Aries, Taurus, Virgo, Scorpio",
  },
  {
    name: "Aquamarine",
    image: "https://previews.123rf.com/images/j33p3l2/j33p3l21701/j33p3l2170100014/70912712-section-transversale-section-d%C3%A9tail-macro-d-une-pierre-aquamarine-g%C3%A9ode-belle-pierres-pr%C3%A9cieuses-crista.jpg",
    power: "Attenuates nervousness and promotes psychic balance",
    forWho: "Aquarius, Pisces, Libra, Gemini",
  },
  {
    name: "Cacholong",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4msz2Mlw1JayM2narfG1caApnXJCbBcjGIEk8vT5Hk4ohijLhUA",
    power: "Regulates emotions, detangles the energy nodes",
    forWho: "Gemini, Cancer, Virgo, Capricorn, Aquarius, Pisces",
  },
  {
    name: "Purple fluorite",
    image: "http://pixiecrystals.com/upload/shop/Cubic%20deep%20Purple%20Fluorite%20twin%204064%20%204.jpg",
    power: "Attenuates psychological agitation, develops the spiritual vision",
    forWho: "Capricorn, Aquarius, Pisces",
  },
  {
    name: "Aventurine",
    image: "http://www.pierres-precieuses.net/images/aventurineverte-pierresroulees.jpg",
    power: "Consolidates the control of emotions, helps to preserve romantic relationships from a distance",
    forWho: "Cancer, Taurus, Libra",
  },
  {
    name: "Amber",
    image: "https://i.imgur.com/fxPPQxa.jpg",
    power: "Drives away dark and parasitic thoughts, cleans the aura of its negative energy",
    forWho: "Gemini, Leo, Virgo",
  },
  
  ]

Stone.create(stoneData)
.then( stoneResults => {
  console.log("Stone Creation SUCCESS")
})
.catch(err => console.log("Stone Creation FAILED"));

//////////////////ADMIN USER CREATION////////////////////////////

const userData = [{
fullName: "Admin",
email: "admin@mail.com",
image: "../public/images/admin.png",
zodiac: 'Taurus',
location: "Paris",
// possession:[
//     {
//         type: Schema.Types.ObjectId,
//         ref: "Stone"
//     }
// ],
// googleID: String,

encryptedPassword: bcrypt.hashSync("g0", 10),
role: "admin",
}];

User.create(userData)
.then( userResults => {
  console.log("User Creation SUCCESS")
})
.catch(err => console.log("User Creation FAILED"));
