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

exports.findLandmarks = functions.https.onRequest(async(req, res) => {
    return cors(req, res, () => {
        res.set('Access-Control-Allow-Origin', '*');
        const axios = require('axios');
        const key = functions.config().vision.id;
        // add a check to see if body has an image
        // if not, return an error
        if (!req.body || !req.body.image) {
            res.status(400).send({
                error: true,
                message: 'No image detected'
            });
        }
        const imageData = req.body.image;

        const url = `https://vision.googleapis.com/v1/images:annotate?key=${key}`
        console.log(url);
        console.log(imageData.substr(0, 20));
        return axios.post(url, {
                "requests": [{
                    "image": {
                        "content": imageData
                    },
                    "features": [{
                        "type": "LANDMARK_DETECTION",
                        "maxResults": 50
                    }, ]
                }]
            })
            .then(response => {
                console.log('formatting data');
                const landmark = response.data.responses[0].landmarkAnnotations[0];
                console.log(JSON.stringify(landmark));
                return {
                    landmark: landmark.description,
                    lat: landmark.locations[0].latLng.latitude,
                    long: landmark.locations[0].latLng.longitude
                };
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