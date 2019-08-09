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

getSong("Stupid Mouth");

