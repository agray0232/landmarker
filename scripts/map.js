function initMap() {
  var uluru = {lat: 33.753746, lng: -84.386330};
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 2, center: uluru});
  // The marker, positioned at Uluru
 
  //test Marker 
 // var marker = new google.maps.Marker({position: uluru, map: map});

  //Need to map markers through firestore
  

}