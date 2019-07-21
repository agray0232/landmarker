var userLoggedIn = false;

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

function addAuthEventListeners() {
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

function logoutEventListener() {
    var logoutPromise = new Promise(function (resolve, reject) {
        firebase.auth().signOut()
            .then(function () {
                userLoggedIn = false;
                renderLoginButton();
                addEventListeners();
                resolve();
            })
            .catch(function (error) {
                // An error happened
            })
    })
    return logoutPromise;
}

function isUserLoggedIn() {
    var loggedIn = false;

    var currentUser = firebase.auth().currentUser;
    if (userLoggedIn || currentUser) {
        loggedIn = true;
    }

    return loggedIn;
}