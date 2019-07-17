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
                resolve();
            } else {
                // User not logged in or has just logged out.
            }
        });

    });

    return promise;
}