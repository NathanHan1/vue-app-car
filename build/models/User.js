const mongoose = require('mongoose');

module.exports = mongoose.model("user", {
    id: Number,
    name: String,
    age: Number,
    tel: String
});
