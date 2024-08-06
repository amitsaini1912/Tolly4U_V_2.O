// This is for serverSide Validation 

const joi = require("joi");

module.exports.filmSchema = joi.object ({
    film: joi.object ({
        title: joi.string().required(),
        url: joi.string().required(),
        description: joi.string().required(),
        originalTitle: joi.string().required(),
        story: joi.string().required(),
        genre: joi.string().required(),
        category: joi.string().required(),
        categoryType: joi.string().required(),
        casts: joi.string().required(),
        directors: joi.string().required(),
        runtime: joi.string().required(),
        releaseDate: joi.string().required(),
        filmPoster: joi.string().required(),
        screenshoots:joi.array().items(joi.string().required()),
        videoSrc: joi.string().required(),
        videoDownload1: joi.string(),
        videoDownload2: joi.string(),
        links1080p: joi.array().items(joi.string().allow('')).optional(),
        links720p: joi.array().items(joi.string().allow('')).optional(),
        links480p: joi.array().items(joi.string().allow('')).optional(),
        fileSizes: joi.array().items(joi.string().allow('')).optional(),
        episodes: joi.array().items(joi.string().allow('')).optional(),
    }).required(),
});

module.exports.messageSchema = joi.object ({
    message: joi.object ({
        name: joi.string().required(),
        email: joi.string().required(),
        message: joi.string().required().min(25),
    }).required(),
});        