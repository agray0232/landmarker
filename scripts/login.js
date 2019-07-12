var firebaseConfig = {
    apiKey: "AIzaSyAHQfTJLUMgBDlx94jzXev8YalLgMwXzgI",
    authDomain: "landmarks-959fd.firebaseapp.com",
    databaseURL: "https://landmarks-959fd.firebaseio.com",
    projectId: "landmarks-959fd",
    storageBucket: "landmarks-959fd.appspot.com",
    messagingSenderId: "428028328211",
    appId: "1:428028328211:web:a00b8a622bf73b0d"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
document.getElementById('LoginBtn').addEventListener('click', function(e) {
    e.preventDefault()
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                return true;
            },
            uiShown: function() {
                
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        // signInFlow: 'popup',
        signInSuccessUrl: 'pages/addTrip.html',
        signInOptions: [
            {
              provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
              requireDisplayName: false
            }
          ],

    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);


})



