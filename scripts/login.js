// var ui = new firebaseui.auth.AuthUI(firebase.auth());
const loginButtons = document.getElementsByClassName('js-login-button');

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
    signInOptions: [{
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
    }],

};
var ui = new firebaseui.auth.AuthUI(firebase.auth());

$.each(loginButtons, (index, loginButton) => {
    loginButton.addEventListener('click', function(e) {
        e.preventDefault()
        ui.start('#firebaseui-auth-container', uiConfig);


    })
})