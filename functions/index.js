const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp();

const cors = require('cors')({
    origin: true
});

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    return cors(req, res, () => {
        var express = require('express');
        const axios = require('axios');

        var fs = require('fs');
        var image = fs.readFileSync("/Users/anthonygray/Downloads/big-ben-test.jpg");

        const key = functions.config().vision.id;
        //console.error(req.body);
        //console.error(JSON.stringify(req.body.base64img));
        const buff = Buffer.from(image);
        const base64img = buff.toString('base64');
        console.error(base64img);

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
                });
            });
    })
});
