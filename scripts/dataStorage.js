firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
    } else {
        // User not logged in or has just logged out.
    }
});

function writeLocation(resJson) {
    console.log("Writing response to firebase");
    const userId = firebase.auth().currentUser.uid;
    //firebase.database().set
    firebase.database().ref('users/' + userId).child("landmarks").set(resJson);
}

function getAllLandmarks() {
    var userId = firebase.auth().currentUser.uid;

    var promise = new Promise(function (resolve, reject) {

        firebase.database().ref('users/' + userId).once('value').then(function (snapshot) {
            resolve(snapshot);
        });

    })

    return promise;
}