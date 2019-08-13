require("dotenv").config();

let keys = require("./keys.js");

let axios = require("axios");

let Spotify = require('node-spotify-api');

let spotify = new Spotify(keys.spotify);

let userCommand = process.argv[2];

let userSearch = process.argv[3];

console.log(userCommand);
console.log(userSearch);

function startSearch(userCommand) {
    switch (userCommand) {
        case "spotify-this-song":
            if (userSearch != null) {
                searchSpotify(userSearch);
            } else searchSpotify("I saw the sign");

            break;

        case "movie-this":
            if (userSearch != null) {
                searchMovie(userSearch);
            } else searchMovie("Mr. Nobody");

            break;

    };
};

startSearch(userCommand);


function searchSpotify(song) {

    spotify
        .search({ type: 'track', query: song, limit: 1, })
        .then(function (response) {
            // console.log(response.tracks);
            let data_array = response.tracks.items;

            // console.log(data_array);

            data_array.forEach(element => {
                let artistName = "";

                let currentArtist = element.album.artists;
                currentArtist.forEach(element => {
                    // console.log(element.name);
                    artistName = element.name;
                });

                let songName = element.name;
                let albumName = element.album.name;
                let previewURL = element.preview_url;


                console.log("----------------"
                    + "\n"
                    + "Song Title:  " + songName + "\n"
                    + "Album: " + albumName + "\n"
                    + "Artist: " + artistName + "\n"
                    + "Preview Album: " + "\n" + previewURL
                    + "\n"
                    + "----------------");
            });




        })
        .catch(function (err) {
            console.log(err);
        });
};



function searchMovie(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=81f286b9").then(
        function (response) {
            // console.log(response);
            let data = response.data;
            // console.log(data);

            let movie_title = data.Title;
            let movie_year = data.Year;
            let movie_rating = data.Rated;
            let movie_country = data.Country;
            let movie_language = data.Language;
            let movie_plot = data.Plot;
            let movie_actors = data.Actors;

            console.log("----------------"
            + "\n"
            + "Movie Title: " + movie_title
            + "\n" + "Movie Year: " + movie_year
            + "\n" + "Movie Rating: " + movie_rating
            + "\n" + "Movie Country: " + movie_country
            + "\n" + "Movie Language: " + movie_language
            + "\n" + "Movie Plot: " + movie_plot
            + "\n" + "Movice Actors: " + movie_actors
            + "\n" + "----------------");

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};