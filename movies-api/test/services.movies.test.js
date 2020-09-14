const { request } = require("express");

const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies');

describe("service - movies", function () {
    const MoviesServices = proxyquire('../services/movies', {
        '../lib/mongo': MongoLibMock
    })

    const moviesService = new MoviesServices();
    describe("when getMovies method is called", async function () {
        it('should call the getall MongoLib method', async function () {
            await moviesService.getMovies({});
            assert.strictEqual(getAllStub.called, true);
        });
    });
});