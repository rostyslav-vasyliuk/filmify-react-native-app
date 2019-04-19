const axios = require('axios');
const { User } = require('../models/user-model');

const getDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=credits,videos`
    );
    res.send(data.data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSimilar = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );
    res.send(data.data);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getByGenres = async (req, res) => {
  try {
    const genre_id = req.params.genre_id;
    const data = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genre_id}`
    );
    res.send(data.data);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getTopTen = async (req, res) => {
  try {
    const data = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`
    );
    res.send(data.data);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getUpcoming = async (req, res) => {
  try {
    const data = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2019-04-07`
    );
    res.send(data.data);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getTopRated = async (req, res) => {
  try {
    const data = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );
    res.send(data.data);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getNowPlaying = async (req, res) => {
  try {
    const data = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );
    res.send(data.data);
  } catch (err) {
    res.status(500).json(err);
  }
}

const searchMovie = async (req, res) => {
  try {
    const query = req.params.query;
    const data = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );
    res.send(data.data);
  } catch (err) {
    res.status(500).json(err);
  }
}

const addToListController = async (req, res) => {
  try {
    let user = await User.findById(req.body.user_id);
    if (!user.movies.find((item) => item.id === req.body.movie.id)) {
      user.movies.push(req.body.movie);
      await user.save();
      return res.status(200).json({ message: 'Film added succesfully' });
    } else {
      return res.status(200).json({ message: 'This film already is in this list' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const getFavotiteListController = async (req, res) => {
  try {
    let user = await User.findById(req.body.user_id);
    return res.status(200).json(user.movies)
  } catch (err) {
    res.status(500).json(err);
  }
}

const removeFromListController = async (req, res) => {
  try {
    let user = await User.findById(req.body.user_id);
    if (user.movies.find((item) => item.id === req.body.movie_id)) {
      user.movies = user.movies.filter((elem) => elem.id !== req.body.movie_id);
      await user.save();
      return res.status(200).json({ message: 'Film removed succesfully' });
    } else {
      return res.status(200).json({ message: 'Film doesnt exist in this list' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const checkIfBelongsToUserController = async (req, res) => {
  try {
    const { userid, movieid } = req.params;
    let user = await User.findById(userid);

    if (user.movies.find((item) => item.id == movieid)) {
      return res.status(200).json({ result: true })
    } else {
      return res.status(200).json({ result: false })
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getDetails,
  getSimilar,
  getByGenres,
  getTopTen,
  getUpcoming,
  getTopRated,
  getNowPlaying,
  searchMovie,
  addToListController,
  getFavotiteListController,
  removeFromListController,
  checkIfBelongsToUserController
};
