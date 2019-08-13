var axios = require("axios");
 
function getBands(band) {
    axios
        .get("")
        .then(function (response) {


            console.log(response.data);
        })
        .catch(function (error) {
            if (error.response) {

                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {

                console.log(error.request);
            } else {

                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

getBands();