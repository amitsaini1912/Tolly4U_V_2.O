const mongoose = require("mongoose");
const initData = require("./sampleData.js");
const Film = require("../models/film.js");

DB_URL = "mongodb+srv://galaxygatewayentertainment:W7ceodrgjE7Wl4Il@tolly4udownload.stinmss.mongodb.net/?retryWrites=true&w=majority";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
  
async function main() {
  await mongoose.connect("mongodb://localhost:27017/streaming");
}

const initDB = async () => {
  await Film.deleteMany({});
  await Film.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();