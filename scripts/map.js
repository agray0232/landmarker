/**
 * Map object from the google maps API
 */
var map = null;

/**
 * An array of markers currently shown on the map
 */
var markers = [];

initialize();

/**
 * Initializes this page by adding event listeners, initializing the google map
 * API and initializing firebase
 */
function initialize() {
  addCloudFunctions();
  initializeMap();
  firebasePromise = initializeFirebase()
    .then(function () {
      updatePage();
    });
}

/**
 * Renders any html elements, adds event listeners, and updates the map
 */
function updatePage() {
  renderLoginButton();
  addAuthEventListeners();
  updateMap();
}

/**
 * Adds an event listener to the cloud function invocation 
 */
function addCloudFunctions() {
  $(document).ready(function () {
    $('.js-upload').on('click', (e) => {
      e.preventDefault();
      cloudFindLandmarks();
    })
  });
}

/**
 * Creates and initializes the google maps API
 */
function initializeMap() {
  window.initMap = function () {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 10.924638, lng: -29.706279 },
      zoom: 2.5,
      styles: getGoogleMapsStyle()
    });
  }
}

/**
 * Updates the map by either 
 */
function updateMap() {
  if (isUserLoggedIn()) {
    var landmarksPromise = getCurrentUserData();
    landmarksPromise.then(function (snapshot) {
      addDataFromSnapshot(snapshot);
    });
  }
  else {
    clearMap();
  }
}

function addDataFromSnapshot(snapshot) {
  var stringSnapshot = JSON.stringify(snapshot);
  if (stringSnapshot !== "null") {
    var objectSnapshot = JSON.parse(stringSnapshot);
    var landmarks = objectSnapshot.landmarks;
    for (var landmarkIndex in landmarks) {
      var landmark = landmarks[landmarkIndex];
      if (!mapContains(landmark)) {
        addPin(landmark.description, landmark.lat, landmark.long)
      }
    }
  }
}

function clearMap() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function mapContains(landmark) {
  var contains = false;

  if (markers.filter(marker => (marker.title === landmark.description)).length > 0) {
    contains = true;
  }
  return contains;
}

function addPin(name, lat, lng) {
  var marker = new google.maps.Marker({
    position: {
      lat: lat,
      lng: lng,
    },
    map: map,
    title: name,
  });
  markers.push(marker);
}

/**
 * Creates an array of google maps style objects
 * 
 * @returns An array containing style objects for the google maps API
 */
function getGoogleMapsStyle() {
  var style = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
    }
  ]

  return style;
}