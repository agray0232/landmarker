firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        window.location = '../index.html'
    }
});

document.getElementById('sign-out').addEventListener('click', function (e) {
    e.preventDefault()
    firebase.auth().signOut()
        .then(function () {
            window.location = "../index.html";
        })
        .catch(function (error) {
            // An error happened
        })
});