function getBase64(file) {
    var reader = new FileReader();

    return new Promise(function(resolve, reject) {
        reader.readAsDataURL(file);
        reader.onerror = function(error) {
            console.log('Error: ', error);
            reject(error);
        };
        reader.onload = function() {
            resolve(reader.result);
        };
    })
}

function testFunction() {

    var file = document.querySelector('#image').files[0];

    getBase64(file).then((base64img) => {
        var xhr = createCORSRequest('POST', "https://us-central1-landmarks-959fd.cloudfunctions.net/findLandmarks");
        if (!xhr) {
            throw new Error('CORS not supported');
        } else {
            console.log('CORs is supported');

            // Response handlers.
            xhr.onload = function() {
                var text = xhr.responseText;
                var resJson = JSON.parse(text);
                console.log(resJson);
                var name = resJson.landmark;
                var lat = resJson.lat;
                var lng = resJson.long;
                addPin(name, lat, lng);
            };

            xhr.onerror = function() {
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