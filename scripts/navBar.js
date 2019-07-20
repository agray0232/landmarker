// scroll functions
$(window).scroll(function (e) {

    // add/remove class to navbar when scrolling to hide/show
    var scroll = $(window).scrollTop();
    if (scroll >= 150) {
        $('.navbar').addClass("navbar-hide");
    } else {
        $('.navbar').removeClass("navbar-hide");
    }

});

function renderLoginButton() {
    console.log("Rendering login button");
    var loginButtonContainer = document.getElementById("firebaseui-auth-container");
    var loginButtonHTML = getLoginButtonHTML();
    loginButtonContainer.innerHTML = loginButtonHTML;
}

function getLoginButtonHTML() {
    var html = ``;

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

    html = `
        <button id="LoginBtn" class="btn btn-primary ${btnClass}">${btnText}</button>
    `

    return html
}
