initialize();

/**
 * Initializes the authentication and rendering of html elements
 */
function initialize() {
    firebasePromise = initializeFirebase()
        .then(function () {
            renderLoginButton();
            renderGetStartedButton();
            addEventListeners();
        });
}

/**
 * Wrapper method for adding event listeners on all the html elements
 */
function addEventListeners() {
    addAuthEventListeners();
    addLocalEventListners();
}

/**
 * Adds an event listener onto any element of the "redirect-trips" class
 */
function addLocalEventListners() {
    var toTripsElements = document.getElementsByClassName("redirect-trips");

    for (i = 0; i < toTripsElements.length; i++) {
        toTripsElements[i].addEventListener('click', function (e) {
            e.preventDefault;
            window.location.href = 'pages/addTrip.html';
        });
    }
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
            getStartedBtn.className += " redirect-trips";
        }
        else {
            getStartedBtn.className += " btn-login";
        }
    }
}