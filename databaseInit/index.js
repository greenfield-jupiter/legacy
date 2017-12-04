const axios = require('axios');
var config = require('../config/config.example.js');
const Movie = require('../db/Movie');
if (!process.env.TMDBAPI) {
  config = require('../config/config.js');
}
const omdbToken = process.env.OMDBAPI || config.OMDBAPI;

var json = require('./movieList.json');
// var json = require('./movieList1980.json');
// var json = require('./movieList1900.json');

var totalReadCount = 0;

var isComplete = () => {
  console.log('\x1b[0m' + `${totalReadCount} out of ${json.length - 1}`);
  if (totalReadCount === json.length - 1) {
    console.log('\x1b[0m' + '////////////////////////////////');
    console.log('Initialization complete!');
    process.exit();
  }
}

const movieDownload = async (movieObj) => {
  if (!movieObj) {
    console.log('movieObj wasn\'t passed')
    return;
  }
    try {
      const movie = await Movie.findOneAndUpdate({ Title: movieObj.title }, {});
      if (movie) {
        console.log('\x1b[32m' + `In Db - ${movieObj.title}`);
        totalReadCount += 1;
        isComplete();
      } else {
        var data = await axios.get(`http://www.omdbapi.com/?apikey=${omdbToken}&t=${movieObj.title}&plot=full`);
        if (data.data.Response !== 'False') {
          var movieOMDB = new Movie(data.data);
          movieOMDB.save((err, res) => {
            if (err) {
              if (err.code === 11000) {
                console.log('\x1b[35m' + `Dupp  - ${movieObj.title}`);totalReadCount += 1;
                isComplete();
              } else {
                console.log('\x1b[31m' + err);
                totalReadCount += 1;
                isComplete();
              }
            } else {
              totalReadCount += 1;
              isComplete();
              console.log('\x1b[34m' + 'Added -', data.data.Title);
            }
          });
        } else {
          console.log('\x1b[33m' + `Skip  - ${movieObj.title}`);
          totalReadCount += 1;
          isComplete();
        }
      }
    } catch (err) {
      console.log(err);
    }
}

const omdbMassiveInitialize = function(starterKey) {
  console.log('\x1b[0m', '////////////////////////////////');
  console.log('starterKey Accepted - Initializing')
  console.log('////////////////////////////////');
  if (starterKey === 'bingoBongo') {
    for (var i = 0; i < json.length; i++) {
      (function (i) {
        setTimeout(function () {
          movieDownload(json[i])
        }, 5*(i));
      })(i);
    }
  } else {
    console.log('\x1b[31m' + 'Invalid starterKey');
    console.log('\x1b[0m' + '////////////////////////////////');
    process.exit()
  }
}

console.log(`Alert!\nInitializing ${json.length} movies`);
omdbMassiveInitialize('');
