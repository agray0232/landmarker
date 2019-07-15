var map = null;
var markers = [];

$(document).ready(function () {
  $('.js-upload').on('click', (e) => {
    e.preventDefault();
  })
});

function initialize() {
  var firebasePromise = initializeFirebase();
  firebasePromise.then(() => {
    updateMap();
  });
}

window.initMap = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 10.924638, lng: -29.706279 },
    zoom: 2.5,
    styles: [
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
  });
}

initialize();

function updateMap() {
  var landmarksPromise = getCurrentUserData();
  landmarksPromise.then(function (snapshot) {

    var stringSnapshot = JSON.stringify(snapshot);
    var objectSnapshot = JSON.parse(stringSnapshot);
    var landmarks = objectSnapshot.landmarks;
    for (var landmarkIndex in landmarks) {
      var landmark = landmarks[landmarkIndex];
      if (!mapContains(landmark)) {
        addPin(landmark.description, landmark.lat, landmark.long)
      }
    }
  })
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