function updateDatabase(resJson) {
    const userId = firebase.auth().currentUser.uid;
    resJson.forEach(function (landmark) {
        var name = landmark.description;
        var landmarkObj = {};
        landmarkObj[name] = landmark;
        firebase.database().ref('users/' + userId).child("landmarks").update(landmarkObj);
    })
}

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
