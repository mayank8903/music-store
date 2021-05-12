var mongoose = require("mongoose");

var musicSchema = new mongoose.Schema({
    first_name: { type: String, required: true, minlength: 3 },
    last_name: { type: String, required: true, minlength: 1 },
    contact_no: { type: Number, required: true, minlength: 2 },
    email: { type: String, required: true, min: 0, max: 10 },
    location: {type: String, required: true, minlength: 3}
  });
  mongoose.model("customers", musicSchema);