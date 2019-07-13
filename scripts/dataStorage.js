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
    return firebase.database().ref('users/' + userId).once('value').then(function (snapshot) {
        console.log(JSON.stringify(snapshot));
        return snapshot;
    });
}

/*
function getAllLandmarks() {
    var landmarks = [
        {
            description: "Big Ben",
            lat: 51.500782,
            long: -0.12462600000000001
        },
        {
            description: "Taj Mahal",
            lat: 27.174698469698683,
            long: 78.042073
        }
    ]

    return landmarks
}*/