var mongoose = require("mongoose");
var album = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 }
});
var musicSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  artist: { type: String, required: true, minlength: 1 },
  genre: { type: String, required: true, minlength: 2 },
  popularity: { type: Number, required: true, min: 0, max: 10 },
  albumName: [album]
});
mongoose.model("musics", musicSchema);
