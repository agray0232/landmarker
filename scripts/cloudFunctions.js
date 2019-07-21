/**
 * Returns a Base64 string representation of an image contained in the file location
 * 
 * @param file - File path to an image on a users computer
 * @returns A promise that will resolve with Base64 string data
 */
function getBase64(file) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) {
        reader.readAsDataURL(file);
        reader.onerror = function (error) {
            console.log('Error: ', error);
            reject(error);
        };
        reader.onload = function () {
            resolve(reader.result);
        };
    })
}

/**
 * Creates a request to the "findLandmarks" cloud function for an image selected by a user. Once 
 * a response from the cloud function is received, the Firebase storage is updated and the google
 * map API is updated.
 */
function cloudFindLandmarks() {

    if (document.querySelector('#image').files.length > 0) {
        var file = document.querySelector('#image').files[0];

        getBase64(file).then((base64img) => {
            var xhr = createCORSRequest('POST', "https://us-central1-landmarks-959fd.cloudfunctions.net/findLandmarks");
            if (!xhr) {
                throw new Error('CORS not supported');
            } else {

                // Response handlers.
                xhr.onload = function () {
                    var text = xhr.responseText;
                    var resJson = JSON.parse(text);
                    updateDatabase(resJson);
                    updateMap();
                    console.log(resJson);
                };

                xhr.onerror = function () {
                    alert('Woops, there was an error making the request.');
                };

                xhr.setRequestHeader('content-type', 'application/json');

                var data = {
                    "image": base64img.split(',')[1]
                }

                xhr.send(JSON.stringify(data));
            }
        });
    }
    else {
        alert("No photo selected");
    }
}

/**
 * Creates a Cross-Origin Resource Sharing (CORS) request given a method type, url, and data
 * 
 * @param  method - The REST method type (ie: POST, GET, etc)
 * @param  url - The URL to send the request
 * @param  data - Currently unused
 */
function createCORSRequest(method, url, data) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);

    } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;

    }
    return xhr;
}