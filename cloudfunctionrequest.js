// curl -v -s -H "Content-Type: application/json" \
//     https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCF9CoEuGiY-fMmtxisIyDVqFSJ55pIezw \
//     --data-binary @request.json

function cloudFunction(req, res) {
    const axios = require('axios');
    const key = functions.config().vision.id;
    const image = req.params.image;
    const base64img = btoa(image);

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
                }, ]
            }]
        })
        .then(response => {
                const landmarks = response.data.responses[0].landmarkanotations;
                return {
                    landmark: landmarks.landmarkanotations.description,
                    lat: long:
                });

        }