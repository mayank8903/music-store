var mongoose = require('mongoose');
var Music = mongoose.model('musics');


const getMusic = function (req, res) {
  Music.find().exec(function (err, data){
    if(err){
      res
          .status(404)
          .json(err)
        return;
    }
    res
      .status(200)
      .json(data)
  });
};
const createMusic = function (req, res) {
  Music.create({
    name: req.body.name,
    artist: req.body.artist,
    genre: req.body.genre,
    popularity: req.body.popularity,
    albumName: [
      {name: req.body.name}
    ]
  }, (err, data) => {
    console.log("data : ", data);
    if(err) {
      res
        .status(400)
        .json(err)
    }else{
      res
        .status(201)
        .json(data)
    }
  })
};
const getSingleMusic = function (req, res) {
  if(!req.params.musicid){
    res
      .status(404)
      .json({
        "message": "Not found, musicid is required"
      });
      return;
  }
  Music.findById(req.params.musicid)
    .exec((err, data) => {
      if(!data) {
        res
                .json(404)
                .status({
                    "message": "music data not found"
                });
      }
    else if(err) {
    res
      .status(400)
      .json(err);
      return;
    }
    else {
    res
      .status(200)
      .json(data)
  }
});
};
const updateMusic = function (req, res) {
  if (!req.params.musicid){
    res
        .status(404)
        .json({
            "message": "Not found, musicid is required"
        });
return;
}
Music.findById(req.params.musicid)
    .exec((err, data) => {
        if (!data) {
            res
                .json(404)
                .status({
                    "message": "music data not found"
                });
        }else if (err){
            res
                .status(400)
                .json(err);
                return;
        }
        data.name = req.body.name;
        data.artist = req.body.artist;
        data.genre = req.body.genre;
        data.popularity = req.body.popularity;
        data.albumName = req.body.albumName;
        data.save((err, data) => {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                res
                    .status(200)
                    .json(data)
            }
        });
    });
};
const deleteMusic = function (req, res) {
  const musicid = req.params.musicid;

  if (musicid) {
      Music
          .findByIdAndRemove(musicid)
          .exec((err, data) => {
              if (err) {
                  res
                      .status(404)
                      .json(err);
                  return;
              }
              res 
                  .status(204)
                  .json(null);
          });
  } else {
      res
          .status(404)
          .json({"message" : "No musicid"});

  }
};
module.exports = {
  getMusic,
  createMusic,
  getSingleMusic,
  updateMusic,
  deleteMusic,
};
