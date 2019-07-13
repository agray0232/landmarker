const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const cors = require('cors')({
    origin: true
});

/**
 * Queries the Cloud Vision API to check for landmarks inside of a provided image,
 * and returns an array of all the identified landmarks
 * 
 * @param req - JSON request with body that contains field "image" which is a stringified base64 formatted image
 * @returns res - A response with an array of found landmarks       
 */
exports.findLandmarks = functions.https.onRequest(async (req, res) => {
    return cors(req, res, () => {
        res.set('Access-Control-Allow-Origin', '*');
        const axios = require('axios');

        // Grab the vision api key from the configuration
        const key = functions.config().vision.id;

        // If there is no body or image, send back an error
        if (!req.body || !req.body.image) {
            res.status(400).send({
                error: true,
                message: 'No image detected'
            });
        }

        // Grab the base64 image data
        const imageData = req.body.image;

        const url = `https://vision.googleapis.com/v1/images:annotate?key=${key}`

        return axios.post(url, {
            "requests": [{
                "image": {
                    "content": imageData
                },
                "features": [{
                    "type": "LANDMARK_DETECTION",
                    "maxResults": 50
                },]
            }]
        })
            .then(response => {
                return formatData(response.data.responses);
            })
            .then(data => {
                console.log('success');
                res.send(data);
            })
            .catch(error => {
                console.log('error');
                console.error(error.response);
                res.status(400).send({
                    error: error.response
                });
            })
    })
});

/**
 * Creates an array of landmark objects from the raw data from cloud vision. Cloud vision
 * can return multple hits for the same landmark, so this method checks against that.
 * 
 * @param data - Raw cloud vision response data
 * @returns formattedData - An array of landmark objects extracted from the raw data
 */
function formatData(data) {
    var formattedData = [];
    console.log('formatting data');

    data[0].landmarkAnnotations.forEach(function (landmark) {

        // If the formatted data does not already contain this landmark
        if (formattedData.filter(formattedLandmark => (formattedLandmark.description === landmark.description)).length == 0) {
            var landmark =
            {
                description: landmark.description,
                lat: landmark.locations[0].latLng.latitude,
                long: landmark.locations[0].latLng.longitude
            }
            formattedData.push(landmark);
        }
    })

    return formattedData;
}

