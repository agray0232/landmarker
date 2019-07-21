initialize();

/**
 * Initializes the authentication and rendering of html elements
 */
function initialize() {
    firebasePromise = initializeFirebase()
        .then(function () {
            updatePage();
        });
}

/**
 * Renders any html elements and adds event listeners
 */
function updatePage() {
    renderLoginButton();
    addAuthEventListeners();
}