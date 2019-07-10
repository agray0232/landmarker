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

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // return cors(req, res, () => {
    const axios = require('axios');
    const key = functions.config().vision.id;
    //const image = req.body.image;
    console.error(req.body.image);
    const buff = Buffer.from(req.body.image);
    const base64img = buff.toString('base64');
    // const base64img = req.body.image.buffer.toString('base64')

    const url = `https://vision.googleapis.com/v1/images:annotate?key=${key}`
    return axios.post(url, {
        "requests": [{
            "image": {
                "source": {
                    "content": base64img,
                }
            },
            "features": [{
                "type": "LANDMARK_DETECTION",
                "maxResults": 50
            },]
        }]
    })
        .then(response => {
            const landmarks = response.data.responses[0].landmarkanotations;
            res.set('Access-Control-Allow-Origin', '*');
            res.json({
                landmark: landmarks.landmarkannotations.description,
                //lat: long:
            });
        });

    // })

    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    //const snapshot = admin.database().ref('/messages').push({ original: original });
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    //res.json({
    //   status: 'success',
    //    ref: snapshot.ref.toString(),
    //});
});
