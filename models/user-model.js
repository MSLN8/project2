const mongoose = require("mongoose");
const Schema = mongoose.Schema;


///////////SCHEMA CREATION FOR USER MODEL//////////////////////////////////////////////////////////
const userSchema = new Schema ({
    fullName: {type: String,required : true },
    email: {type: String, required: true},
    image: {type: String, default: "https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person"},
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