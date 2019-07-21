/**
 * Scroll event listener that causes the navigation bar to fad once the screen has been scrolled 
 * passed a certain pixel count
 */
$(window).scroll(function (e) {

    // add/remove class to navbar when scrolling to hide/show
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
        $('.navbar').addClass("navbar-hide");
    } else {
        $('.navbar').removeClass("navbar-hide");
    }

});

/**
 * Renders the firebase authentication container
 */
function renderLoginButton() {
    var loginButtonContainer = document.getElementById("firebaseui-auth-container");
    var loginButtonHTML = getLoginButtonHTML();
    loginButtonContainer.innerHTML = loginButtonHTML;
}

/**
 * Builds the login button's HTML based on if a user is logged in or not
 * 
 * @returns String: HTML representing the login button
 */
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
