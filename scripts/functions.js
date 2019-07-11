function testFunction() {
    var xhr = createCORSRequest('POST', "https://us-central1-landmarks-959fd.cloudfunctions.net/addMessage");
    if (!xhr) {
        throw new Error('CORS not supported');
    }
    else {
        console.log('CORs is supported');

        // Response handlers.
        xhr.onload = function () {
            var text = xhr.responseText;
            var resJson = JSON.parse(text);
            console.log(resJson);
            alert('Response from CORS request: ' + resJson.status);
        };

        xhr.onerror = function () {
            alert('Woops, there was an error making the request.');
        };

        xhr.send();
    }
}

function createCORSRequest(method, url) {
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