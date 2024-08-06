if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
  }

const express = require("express");
const app = express();
let port = process.env.PORT;
const mongoose = require("mongoose");
const Film = require("./models/film.js");
const Message = require("./models/message.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const { filmSchema } = require("./schema.js");
// const fs = require("fs-extra"); //IndexNow Api

const Token = process.env.TOKEN;
const DB_URL = process.env.ATLAS_URL;
const DB_LOCAL = "mongodb://localhost:27017/streaming";

main()
    .then(() => {
        console.log(`Connected to DB`);
    })
    .catch((err) => {
        console.log(err)
    });  

async function main() {
    await mongoose.connect(DB_URL);
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
// app.use(express.json()); //IndexNow


const validateFilm = (req, res, next) => {
    let { error } = filmSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next(); 
    }
};

//Home Route
app.get("/", async (req, res) => {
    const allFilms = await Film.find({}).sort({_id: -1});
    res.render("films/index.ejs", { allFilms });
});

//AllMovies Route
app.get("/allfilms", async (req, res) => {
    const total = await Film.countDocuments({});

    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default to 1 if not provided)
    const limit = 24; // Set the limit of documents per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const allFilms = await Film.find({}).sort({_id: -1}).skip(skip).limit(limit);
    res.render("./films/allFilms.ejs", {allFilms, total, page, limit});
});

//new route
app.get("/new", (req, res, next) => {
    try{
        const token = req.query.token
        if( token != Token){
            return next();
        }else{
            res.render("films/new.ejs");
        }
    }catch(err){
        throw err;
    }
});

//new create route
app.post("/new",validateFilm, async (req, res) => {
    try{
        let newFilm = new Film(req.body.film);
        await newFilm.save();
        res.redirect("/");
    }catch(err){
        throw err;
    }
});

//query route
app.put("/search", async (req, res,) => {
    let input = req.body.input;
    let results = await Film.find({ title: { $regex: ".*" + input + ".*", $options: "i" } }).sort({_id: -1});
    const allFilms = await Film.find({}).sort({_id: -1});
    res.render("films/searchShow.ejs", { results, allFilms });
});

// app.get("/trending", async(req, res) => {
//     let allFilms = await Film.find({})
//     let reverse = true;
//     let copyFilms = [...allFilms];
//     copyFilms.reverse();
//     const trending = copyFilms.slice(0,6);
//     res.render("films/trending.ejs", { trending });
// });

//Category route
// app.get("/bollywood", async (req, res) => {
//     const bollywood = await Film.find({ category: "Bollywood" });
//     res.render("categories/bollywood.ejs", { bollywood });
// });
app.get("/bollywood", async (req, res) => {
    const total = await Film.countDocuments({ category: "Bollywood" });

    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default to 1 if not provided)
    const limit = 24; // Set the limit of documents per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const bollywood = await Film.find({ category: "Bollywood" }).sort({_id: -1}).skip(skip).limit(limit); // Apply skip and limit to the query
    res.render("categories/bollywood.ejs", { bollywood, page, limit, total });
});
app.get("/hollywood", async (req, res) => {
    const total = await Film.countDocuments({ category: "Hollywood" });

    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default to 1 if not provided)
    const limit = 24; // Set the limit of documents per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const hollywood = await Film.find({ category: "Hollywood" }).sort({_id: -1}).skip(skip).limit(limit);
    res.render("categories/hollywood.ejs", { hollywood, page, limit, total });
});
app.get("/webseries", async (req, res) => {
    const total = await Film.countDocuments({ category: "Web Series" });

    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default to 1 if not provided)
    const limit = 24; // Set the limit of documents per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const webSeries = await Film.find({ category: "Web Series" }).sort({_id: -1}).skip(skip).limit(limit);
    res.render("categories/webSeries.ejs", { webSeries, page, limit, total });
});
app.get("/adult", async (req, res) => {
    const total = await Film.countDocuments({ category: "Adult" });

    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default to 1 if not provided)
    const limit = 24; // Set the limit of documents per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const adult = await Film.find({ category: "Adult" }).sort({_id: -1}).skip(skip).limit(limit);
    res.render("categories/adult.ejs", { adult, page, limit, total });
});

//Category Type Route
app.get("/comedy", async (req, res) => {
    const total = await Film.countDocuments({ categoryType: "Comedy" });

    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default to 1 if not provided)
    const limit = 24; // Set the limit of documents per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const comedy = await Film.find({ categoryType: "Comedy" }).sort({_id: -1}).skip(skip).limit(limit);
    res.render("categoryTypes/comedy.ejs", { comedy, page, limit, total });
})
app.get("/action", async (req, res) => {
    const total = await Film.countDocuments({ categoryType: "Action" });

    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default to 1 if not provided)
    const limit = 24; // Set the limit of documents per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const action = await Film.find({ categoryType: "Action" }).sort({_id: -1}).skip(skip).limit(limit);
    res.render("categoryTypes/action.ejs", { action, page, limit, total });
})
app.get("/romance", async (req, res) => {
    const total = await Film.countDocuments({ categoryType: "Romance" });

    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default to 1 if not provided)
    const limit = 24; // Set the limit of documents per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const romance = await Film.find({ categoryType: "Romance" }).sort({_id: -1}).skip(skip).limit(limit);
    res.render("categoryTypes/romance.ejs", { romance, page, limit, total });
})
app.get("/horror", async (req, res) => {
    const total = await Film.countDocuments({ categoryType: "Horror" });

    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default to 1 if not provided)
    const limit = 24; // Set the limit of documents per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const horror = await Film.find({ categoryType: "Horror" }).sort({_id: -1}).skip(skip).limit(limit);
    res.render("categoryTypes/horror.ejs", { horror, page, limit, total });
})

//contact route
app.get("/contactus", (req, res) => {
    res.render("contacts/contactus.ejs");
});
app.post("/contactus", async (req, res) => {
    try{
        let newMessage = new Message(req.body);
        await newMessage.save();
        res.redirect("/");
    }catch(err){
        throw err; 
    }
});
app.get("/message_box", async(req, res, next) => {
    const token = req.query.token;
        if( token != Token){
            return next();
        }else{
            const Messages = await Message.find({}).sort({_id: -1});
            res.render("contacts/message_box.ejs", { Messages });
        }
});
app.get("/dmca", (req, res) => {
    res.render("contacts/dmca.ejs");
});
app.get("/disclaimer", (req, res) => {
    res.render("contacts/disclaimer.ejs");
});

//show route
app.get("/:url", async (req, res, next) => {

    try {
        const reqUrl = req.params.url;
        const queryFilms = await Film.find({ url: reqUrl });
        if (queryFilms.length === 0) {
            // No film found for the given URL
            return next();
        }
        const reqFilm = queryFilms[0];
        const reqId = reqFilm.id;

        //Check if the ID is in a valid formate
        if(!mongoose.Types.ObjectId.isValid(reqId)){
            return next();
        }

        //Check if a film with the given ID exists
        if (await Film.exists({ _id: reqId })) {
            const film = await Film.findById(reqId);
            const category = await film.category;
            const seeAsWell = await Film.find({ category: category }).sort({_id: -1});
            const allFilms = await Film.find({}).sort({_id: -1});
            res.render("films/show.ejs", { film, seeAsWell, allFilms})
        } else {
           return next()
        }
    } catch (err) {
        throw err;
    }
});

// Serve the robots.txt & sitemap.xml
app.get("/robots.txt", (req, res) => {
    res.sendFile("robots.txt", { root: __dirname });
  });
app.get("/sitemap.xml", (req, res) => {
    res.sendFile("sitemap.xml", { root: __dirname });
});  
//IndexNow Api
// app.post('/2828ec8de36a4e3092f9dfdefe4054ec.txt', async (req, res) => {
//     try {
//       // Key to write to the file
//       const key = '2828ec8de36a4e3092f9dfdefe4054ec';
  
//       // Write key to file
//       await fs.writeFile('2828ec8de36a4e3092f9dfdefe4054ec.txt', key);
  
//       // Respond with success message and Content-Type header
//       res.setHeader('Content-Type', 'application/json; charset=utf-8');
//       return res.status(200).json({ message: 'Key file hosted successfully at https://www.tolly4u.site/2828ec8de36a4e3092f9dfdefe4054ec.txt' });
//     } catch (error) {
//       console.error('Error:', error);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   });


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});


// app.delete("/:id", async (req, res) => {
//     let { id } = req.params;
//     await Film.findByIdAndDelete(id);
//     res.redirect("/letest");
// });


app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Somthing went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message })
});

app.listen(port, () => {
    console.log(`connection successful`);
});