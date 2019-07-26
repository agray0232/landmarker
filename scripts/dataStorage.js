/**
 * Adds the provided JSON object to the Firebase Storage
 * 
 * @param resJson - JSON object received in a cloud function response
 */
function updateDatabase(resJson) {
    const userId = firebase.auth().currentUser.uid;
    resJson.forEach(function (landmark) {
        var name = landmark.description;
        var landmarkObj = {};
        landmarkObj[name] = landmark;
        firebase.database().ref('users/' + userId).child("landmarks").update(landmarkObj);
    })
}

/**
 * Get's a JSON snapshot the current users data from the Firebase Storage
 * 
 * @returns A promise that will resolve with a snapshot
 */
function getCurrentUserData() {
    var promise = new Promise(function (resolve, reject) {

        const userId = firebase.auth().currentUser.uid;

        firebase.database().ref('users/' + userId).once('value').then(function (snapshot) {
            if (snapshot === undefined) {
                reject()
            }
            else {
                resolve(snapshot);
            }
        });

    })

    return promise;
}
