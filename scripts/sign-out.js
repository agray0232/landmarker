var firebaseConfig = {
    apiKey: "AIzaSyAHQfTJLUMgBDlx94jzXev8YalLgMwXzgI",
    authDomain: "problem-2-21b2f.firebaseapp.com",
    databaseURL: "https://problem-2-21b2f.firebaseio.com",
    projectId: "problem-2-21b2f",
    storageBucket: "",
    messagingSenderId: "172722911836",
    appId: "1:172722911836:web:a09bbaf6fcdb39ac"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log("You got to the function");
        // ...
    } else {
        window.location = '../index.html'
        console.log("Hit the Else");
    }
});


document.getElementById('sign-out').addEventListener('click', function(e) {
    e.preventDefault()
    firebase.auth().signOut()
        .then(function() {
            window.location = "../index.html";
        })
        .catch(function(error) {
            // An error happened
        })
});