// scroll functions
$(window).scroll(function (e) {

    // add/remove class to navbar when scrolling to hide/show
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
        $('.navbar').addClass("navbar-hide");
    } else {
        $('.navbar').removeClass("navbar-hide");
    }

});

function renderLoginButton() {
    var loginButtonContainer = document.getElementById("firebaseui-auth-container");
    var loginButtonHTML = getLoginButtonHTML();
    loginButtonContainer.innerHTML = loginButtonHTML;
}

function getLoginButtonHTML() {
    var btnClass = "";
    var btnText = "";

    if (isUserLoggedIn()) {
        btnClass = "btn-logout";
        btnText = "Sign Out";
    }
    else {
        btnClass = "btn-login";
        btnText = "Login";
    }

    return `<button id="LoginBtn" class="btn btn-primary ${btnClass}">${btnText}</button>`
}
