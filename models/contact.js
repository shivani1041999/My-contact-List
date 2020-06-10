
const mongoose = require('mongoose');


// With Mongoose, everything is derived from a Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});
//   compiling our schema into a Model.
// A model is a class with which we construct documents. 
// In this case, each document will be a conatct with properties and behaviors as declared in our schema.
const Contact = mongoose.model('Contact', contactSchema);
// export it to use by index.js
module.exports = Contact;
