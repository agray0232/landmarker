firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
    } else {
        // User not logged in or has just logged out.
    }
});

function writeLocation(resJson) {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId).map(resJson);
}
writeLocation(Response.resJson)