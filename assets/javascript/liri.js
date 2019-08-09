require("dotenv").config();

let keys = require("./keys.js"); 

let Spotify = require('node-spotify-api');
 


function getSong(song) {
    let spotify = new Spotify(keys.spotify);
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        });
};

getSong("Stupid Mouth");