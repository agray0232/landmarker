/**
 * Keeps track of whether or not a user is logged in. Used in the case that the current user
 * returns null when in fact a user is logged in (an artifact of asynchronicity)
 */
var userLoggedIn = false;

/**
 * Initializes the Firebase Application. 
 * 
 * @returns Intitialization promise that will resolve once the authentication process is complete
 */
function initializeFirebase() {
    var promise = new Promise(function (resolve, reject) {

        var firebaseConfig = {
            apiKey: "AIzaSyAHQfTJLUMgBDlx94jzXev8YalLgMwXzgI",
            authDomain: "landmarks-959fd.web.app",
            databaseURL: "https://landmarks-959fd.firebaseio.com",
            projectId: "landmarks-959fd",
            storageBucket: "landmarks-959fd.appspot.com",
            messagingSenderId: "428028328211",
            appId: "1:428028328211:web:a00b8a622bf73b0d"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User logged in already or has just logged in.
                userLoggedIn = true;
                resolve();
            } else {
                // User not logged in or has just logged out.
                userLoggedIn = false;
                resolve();
            }
        });

    });

    return promise;
}

/**
 * Adds event listeners to any elements that are of the "btn-login" or "btn-logout" classes.
 * 
 * btn-login: loginEventListener
 * btn-logout: logoutEventListener
 */
function addAuthEventListeners() {
    var loginElements = document.getElementsByClassName("btn-login");
    var logoutElements = document.getElementsByClassName("btn-logout");

    for (i = 0; i < loginElements.length; i++) {
        loginElements[i].addEventListener('click', loginEventListener);
    }

    for (i = 0; i < logoutElements.length; i++) {
        logoutElements[i].addEventListener('click', logoutEventListener);
    }
}

/**
 * Event listener that opens the Firebase login prompt
 */
function loginEventListener() {
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                return true;
            },
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: window.location.pathname,
        signInOptions: [{
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false
        }],
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
}

/**
 * Event listener that logs a user out of the Firebase Application 
 * 
 * @returns Logout promise that will resolve once the logout process is complete
 */
function logoutEventListener() {
    var logoutPromise = new Promise(function (resolve, reject) {
        firebase.auth().signOut()
            .then(function () {
                userLoggedIn = false;
                updatePage();
                resolve();
            })
            .catch(function (error) {
                // An error happened
            })
    })
    return logoutPromise;
}

/**
 * Checks if a user is currently logged in
 * 
 * @returns Boolean: TRUE if a user is logged in, FALSE if is user is not logged in
 */
function isUserLoggedIn() {
    var loggedIn = false;

    var currentUser = firebase.auth().currentUser;
    if (userLoggedIn || currentUser) {
        loggedIn = true;
    }

    return loggedIn;
}