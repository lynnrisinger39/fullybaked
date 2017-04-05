// nav bar


var navigation = responsiveNav(".nav-collapse", {
  animate: true,                    // Boolean: Use CSS3 transitions, true or false
  transition: 284,                  // Integer: Speed of the transition, in milliseconds
  label: "Menu",                    // String: Label for the navigation toggle
  insert: "before",                  // String: Insert the toggle before or after the navigation
  customToggle: "",                 // Selector: Specify the ID of a custom toggle
  closeOnNavClick: false,           // Boolean: Close the navigation when one of the links are clicked
  openPos: "relative",              // String: Position of the opened nav, relative or static
  navClass: "nav-collapse",         // String: Default CSS class. If changed, you need to edit the CSS too!
  navActiveClass: "js-nav-active",  // String: Class that is added to <html> element when nav is active
  jsClass: "js",                    // String: 'JS enabled' class which is added to <html> element
  init: function(){},               // Function: Init callback
  open: function(){},               // Function: Open callback
  close: function(){}               // Function: Close callback
});








// initMap() is the callback function that's run when
// the Google Maps JS file has finished loading. It
// then kicks off each of the three demos.

function initMap() {
	console.log("initMap");

	// Demo 4: JavaScript Geolocation API
	geolocationDemo()
	
	// Demo 3: Google Places API
	googlePlacesDemo();

	// Demo 2: Google Maps JavaScript API
	googleMapsDemo();
}





// ------------------------------------------------------ //
//           Demo 4: JavaScript Geolocation API
// ------------------------------------------------------ //
function geolocationDemo() {

	// Elements
	// --------------
	var el = document.querySelector('#geolocation-map');

	// map options
	// --------------
	var options = {
		center: { lat: 36.7783, lng: -119.4179 },
		zoom: 5
	};

	// create a new google map object
	var map = new google.maps.Map(el, options);


	// use the geolocation api to get the current position
	// - setup the callback for when position is determined
	navigator.geolocation.getCurrentPosition(updateLocation);


	// callback function to be called when position is determined
	// - recieves a position object as 1st argument
	function updateLocation(position) {
		console.log("updateLocation", position);

		// extract the lat & long from the position/coordinate object
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		// put a new marker on the map
		var marker = new google.maps.Marker({
			map: map,
			position: {
				lat: latitude,
				lng: longitude
			}
		})

		// re-center and zoom in the map with your location
		map.setCenter( { lat: latitude, lng: longitude } ); 
		map.setZoom(17);
	}

}







// ------------------------------------------------------ //
//           Demo 3: Google Places API
// ------------------------------------------------------ //
function googlePlacesDemo() {
	console.log("googlePlacesDemo");

	// Elements
	// --------------
	var el = document.querySelector('#places-map');

	// map options
	// --------------
	var options = {
		center: { lat: 37.8040, lng: -122.4110 },
		zoom: 15
	};

	// create a new google map object
	var map = new google.maps.Map(el, options);

	// setup new google places api search
	var service = new google.maps.places.PlacesService(map);

	// setup one InfoWindow (popover when marker is clicked)
	var infoWindow = new google.maps.InfoWindow();


	// Do a search for nearby laundry businesses
	// - Documentation for all the place types:
	// - https://developers.google.com/places/supported_types
	service.nearbySearch({
		location: { lat: 37.8040, lng: -122.4110 },
		radius: 1000, // in meters
		type: ['laundry']	
	}, displayResults);

	// the callback function that handles the search result data
	// - calls createMarker 1 time for each place
	function displayResults(results, status) {
		console.log("displayResults");
		results.forEach(createMarker);
	}

	// creates one marker and place it on a map
	// - expects to be passed a Google Place object
	function createMarker(place) {
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location
		});

		marker.addListener('click', function() {
			infoWindow.setContent(place.name);
			infoWindow.open(map, marker);
		})
	}

}







// ------------------------------------------------------ //
//           Demo 2: Google Maps JavaScript API
// ------------------------------------------------------ //
function googleMapsDemo() {
	console.log("googleMapsDemo");

	// Elements
	// --------------
	var el = document.querySelector('#google-map');

	// map options
	// --------------
	var options = {
		center: { lat: 37.7920, lng: -122.3980 },
		zoom: 15
	};

	// create a new google map object
	var map = new google.maps.Map(el, options);

	// create a marker on the map
	var marker = new google.maps.Marker({
		map: map,
		position: { lat: 37.79541, lng: -122.393505 }
	});

}

