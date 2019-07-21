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
    renderGetStartedButton();
    addEventListeners();
}

/**
 * Wrapper method for adding event listeners on all the html elements
 */
function addEventListeners() {
    addAuthEventListeners();
    updateLocalEventListners();
}

/**
 * Updates the event listeners on the "Get Started" button. Adds a login event listener
 * if no user is logged in, and adds a redirection event listener if a user is logged in. 
 * In case of repeated login/logouts, 'old' event listeners are removed.
 */
function updateLocalEventListners() {
    var toTripsElements = document.getElementsByClassName("redirect-trips");

    for (i = 0; i < toTripsElements.length; i++) {
        toTripsElements[i].removeEventListener('click', loginEventListener);
        toTripsElements[i].addEventListener('click', redirectToTrips);
    }

    var loginElements = document.getElementsByClassName("btn-login");

    for (i = 0; i < loginElements.length; i++) {
        loginElements[i].removeEventListener('click', redirectToTrips);
    }
}

/**
 * Redirects the window to the addTrip.html page
 */
function redirectToTrips() {
    window.location.href = 'pages/addTrip.html';
}

/**
 * Renders the "Get Started" button by added either a redirection class or a 
 * login class depending on if a user is logged in or not.
 */
function renderGetStartedButton() {
    var getStartedBtn = document.getElementById("get-started-btn");

    // Ensure we have a good pointer
    if (getStartedBtn) {
        if (isUserLoggedIn()) {
            getStartedBtn.classList.add("redirect-trips");
            // Remove the login button class
            if (getStartedBtn.classList.contains("btn-login")) {
                getStartedBtn.classList.remove("btn-login");
            }
        }
        else {
            getStartedBtn.classList.add("btn-login");
            // Remove the redirect to trips class
            if (getStartedBtn.classList.contains("redirect-trips")) {
                getStartedBtn.classList.remove("redirect-trips");
            }
        }
    }
}