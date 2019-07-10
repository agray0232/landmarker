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
    cors(req, res, () => {
        // Grab the text parameter.
        const original = req.query.text;
        // Push the new message into the Realtime Database using the Firebase Admin SDK.
        const snapshot = admin.database().ref('/messages').push({ original: original });
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        res.set('Access-Control-Allow-Origin', '*');
        res.json({
            status: 'success',
            ref: snapshot.ref.toString(),
        });
    });
});