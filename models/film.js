const { required, string, date, types } = require("joi");
const mongoose = require(`mongoose`);

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  originalTitle: {
    type: String,
    required: true
  },
  story: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Bollywood", "Hollywood", "Web Series", "Adult"]
  },
  categoryType: {
    type: String,
    required: true,
    enum: ["Comedy", "Action", "Horror", "Romance"]
  },
  casts: {
    type: String,
    required: true
  },
  directors: {
    type: String,
    required: true
  },
  runtime: {
    type: String,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  },
  filmPoster: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: ()=> Date.now(),
  },

  //ScreenShots
  screenshoots: {
     type: [String],
     required: true,
  },

  //iframe Video 
  videoSrc: {
    type: String,
    required: true
  },

  //Old Uploded Movies Download Links
  videoDownload1: {
    type: String,
  },
  videoDownload2: {
    type: String,
  },


  //1080P Download Links
  links1080p: {
    type: [String]
  },
  
  //720P Download Links
  links720p: {
    type: [String]
  },
 
  //480p Download Links
  links480p: {
    type: [String]
  },
  
  //File Sizes
  fileSizes: {
    type: [String]
  },

  //Episode Links
  episodes: {
    type: [String]
  },

});

const Film = mongoose.model("Film", filmSchema);
module.exports = Film;