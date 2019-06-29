var firebaseConfig = {
    apiKey: "AIzaSyDKUqyA166OFnoQ-PpOxJ98TuaLQtfV8-g",
    authDomain: "problem-2-21b2f.firebaseapp.com",
    databaseURL: "https://problem-2-21b2f.firebaseio.com",
    projectId: "problem-2-21b2f",
    storageBucket: "",
    messagingSenderId: "172722911836",
    appId: "1:172722911836:web:a09bbaf6fcdb39ac"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('login').addEventListener('click', function(e) {
    e.preventDefault()
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
            },
            uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                // document.getElementById('loader').style.display = 'none';
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'dashboard.html',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.EmailAuthProvider.PROVIDER_ID,

        ],

    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);


})