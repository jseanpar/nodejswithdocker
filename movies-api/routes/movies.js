const express = require('express');
const joi = require("@hapi/joi");
const MoviesService = require('../services/movies');


const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService();

    router.get("/", async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { tags } = req.query;
        try {
            //throw new Error('Ocurrio un error inesperado');
            const movies = await moviesService.getMovies({ tags })
            res.status(200).json({
                data: movies,
                message: 'Movies listed'
            });
        } catch (err) {
            next(err);
        }
    });

    router.get("/:movieId",
        validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
        async function (req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
            const { movieId } = req.params;
            try {
                const movie = await moviesService.getMovie({ movieId })
                res.status(200).json({
                    data: movie,
                    message: 'Movie retrieved'
                });
            } catch (err) {
                next(err);
            }
        });

    router.post("/", validationHandler(createMovieSchema), async function (req, res, next) {
        const { body: movie } = req;

        try {
            const createdMovieId = await moviesService.createMovie({ movie });
            res.status(201).json({
                data: createdMovieId,
                message: 'Movie created'
            });
        } catch (err) {
            next(err);
        }
    });


    router.put("/:movieId", validationHandler(joi.object({ movieId: movieIdSchema }), 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;
        try {
            const updateMovieId = await moviesService.updateMovie({ movieId, movie })
            res.status(200).json({
                data: updateMovieId,
                message: 'Movie updated'
            });
        } catch (err) {
            next(err);
        }
    });

    router.delete("/:movieId", validationHandler(joi.object({ movieId: movieIdSchema }), 'params'), async function (req, res, next) {

        const { movieId } = req.params;
        try {
            const deletedMovieId = await moviesService.deleteMovie({ movieId });
            res.status(200).json({
                data: deletedMovieId,
                message: 'Movie deleted'
            });
        } catch (err) {
            next(err);
        }
    });

    router.patch('/:movieId', async function (req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;
        try {
            const movieModified = await moviesService.updateOneFieldMovie({
                movieId,
                movie
            });
            res.status(200).json({
                data: movieModified,
                message: 'one movie modified'
            });
        } catch (error) {
            next(error);
        }
    });
}

module.exports = moviesApi;