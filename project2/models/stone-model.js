const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stoneSchema = new Schema ({
    name: {type: String,required : true },
    image : { type: String},
    power : {type:  String},
    forWho : {type: String},
    connections : {type: String},
    reviews: [{
        user: {type: String, required: true},
        comments: {type: String}
    }]
}, {
    timestamps : true
});

const Stone = mongoose.model("Stone", stoneSchema);

module.exports = Stone;