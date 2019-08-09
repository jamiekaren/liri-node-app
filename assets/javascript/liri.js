require("dotenv").config();

let keys = require("./keys.js");

let Spotify = require('node-spotify-api');

let spotify = new Spotify(keys.spotify);


function getSong(song) {

    spotify
        .search({ type: 'track', query: song, limit: 1, })
        .then(function (response) {
            // console.log(response.tracks);
            let data_array = response.tracks.items;

            // console.log(data_array);

            data_array.forEach(element => {
                let songName = element.name;
                let albumName = element.album.name;
                let previewURL = element.preview_url;

                console.log("Song Title:  "  + songName + "\n"
                    + "Album: " + albumName + "\n"
                    + "Preview Album: " + previewURL);
            });




        })
        .catch(function (err) {
            console.log(err);
        });
};

getSong("Stupid Mouth");

