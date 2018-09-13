require("dotenv").config()
const mongoose = require("mongoose");
const Stone = require("../models/stone-model.js");
const User = require ("../models/user-model.js")
const bcrypt = require("bcrypt");


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
    image: "https://bit.ly/2x2vNXx",
    power: " Improves creativity, reduces anxiety and stress",
    forWho: "Zodiac stone for pisces",
  },
    {name: "Black Tourmaline",
    image: "https://bit.ly/2wZcJta",
    power: "Brings stability, restores self-confidence, drives out unwanted thoughts",
    forWho: "Cancer, Sagittarius, Capricorn",
 },
    {name: "Carnelian",
    image: "https://bit.ly/2N5GHqv",
    power: "Brings dynamism. Fights sadness and gloom",
    forWho: "Aries, Taurus, Virgo, Scorpio",
},
{name: "Aquamarine",
image: "https://bit.ly/2MkF8Q8",
power: "Attenuates nervousness and promotes psychic balance",
forWho: "Aquarius, Pisces, Libra, Gemini",
},
  
  ]

Stone.create(stoneData)
.then( stoneResults => {
  console.log("Stone Creation SUCCESS")
})
.catch(err => console.log("Stone Creation FAILED"));

//////////////////ADMIN USER CREATION////////////////////////////

const userData = [{
fullName: "Jul",
email: "jul@swag.com",
image: "https://media.giphy.com/media/12uhzw7y9aB8v6/giphy.gif",
// zodiac: { type: String, enum: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']},
location: "Heaven",
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
