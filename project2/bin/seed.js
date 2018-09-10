const mongoose = require("mongoose");
const Stone = require("../models/stone-model.js");


//////////////////Connection to Mongoose////////////////////////////
mongoose
  .connect('mongodb://localhost/project2', {useNewUrlParser: true})
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
     forWho: "Zodiac stone for pisces",
     
    },
  ]

Stone.create(stoneData)
.then( stoneResults => {
  console.log("Stone Creation SUCCESS")
})
.catch(err => console.log("Stone Creation FAILED"));