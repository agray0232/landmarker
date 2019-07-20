initialize();

function initialize() {
    firebasePromise = initializeFirebase()
        .then(function () {
            renderLoginButton();
            addEventListeners();
        });
}

function addEventListeners() {
    var loginElements = document.getElementsByClassName("btn-login");
    var logoutElements = document.getElementsByClassName("btn-logout");

    for (i = 0; i < loginElements.length; i++) {
        loginElements[i].addEventListener('click', function (e) {
            e.preventDefault;
            loginEventListener();
        });
    }

    for (i = 0; i < logoutElements.length; i++) {
        logoutElements[i].addEventListener('click', function (e) {
            e.preventDefault;
            logoutEventListener();
        });
    }
}

