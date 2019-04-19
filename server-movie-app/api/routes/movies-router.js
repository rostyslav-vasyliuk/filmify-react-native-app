const express = require('express');

const movieController = require('../controllers/movie-controller');
const router = new express.Router();

router.get('/details/:id', movieController.getDetails);

router.get('/get-similar/:id', movieController.getSimilar);

router.get('/get-by-genres/:genre_id', movieController.getByGenres);

router.get('/get-top-ten', movieController.getTopTen);

router.get('/get-upcoming', movieController.getUpcoming);

router.get('/get-top-rated', movieController.getTopRated);

router.get('/get-now-playing', movieController.getNowPlaying);

router.get('/search/:query', movieController.searchMovie);

router.post('/add-to-movie-list', movieController.addToListController);

router.post('/remove-from-movie-list', movieController.removeFromListController);

router.post('/get-favorite-movie-list', movieController.getFavotiteListController);

router.get('/check-is-favourite-movie/:userid/:movieid', movieController.checkIfBelongsToUserController)

module.exports = router;