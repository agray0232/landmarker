initialize();

function initialize() {
    firebasePromise = initializeFirebase()
        .then(function () {
            renderLoginButton();
            addAuthEventListeners();
        });
}