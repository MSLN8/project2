const mongoose = require("mongoose");
const Schema = mongoose.Schema;


///////////SCHEMA CREATION FOR USER MODEL//////////////////////////////////////////////////////////
const userSchema = new Schema ({
    fullName: {type: String,required : true },
    email: {type: String, required: true},
    image: {type: String, default: "https://media.giphy.com/media/12uhzw7y9aB8v6/giphy.gif"},
    zodiac: { type: String, enum: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']},
    location: {type: String},
    possession:[
        {
            type: Schema.Types.ObjectId,
            ref: "Stone"
        }
    ],
    googleID: String,

    encryptedPassword: {type: String},
    role: {
    type: String,
    enum: ["normal", "admin"],
    required : true,
    default: "normal",
    },
}, {
    timestamps : true
});

///////////////////////////////////ADMIN VIEW//////////////////////////////////////////////////////////
userSchema.virtual("isAdmin").get(function(){
    return this.role ==="admin";
    });


const User = mongoose.model("User", userSchema);

module.exports = User;