var map;
function init(){
	document.addEventListener("deviceready", onDeviceReady, false)
}
function onDeviceReady(){
	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
}
function onOffline(){
	alert("Not connected to the Internet");
	var mapObj = document.getElementById("myMap");
	mapObj.innerHTML = "Please connect to the Internet";
}
function onOnline(){
	var myscript = document.createElement("script");
	myscript.type = "text/javascript";
	myscript.src = "https://maps.googleapis.com/maps/api/js?callback=getCurrentLoc";
	document.body.appendChild(myscript);
}
function getCurrentLoc(){
	navigator.geolocation.getCurrentPosition(initMap, geoError);
}
function initMap(position) {
	var myLat = position.coords.latitude;
	var myLong = position.coords.longitude;
	var latlong = new google.maps.LatLng(myLat, myLong);
	var mapOptions = {
		center: latlong,
		zoom: 15
	};			
	var mapObj = document.getElementById("myMap");
	map = new google.maps.Map(mapObj, mapOptions);
	var pin;
	pin = new google.maps.Marker({
		position: latlong, 
		map: map
	});
	getGeolocation();
}
function getGeolocation(){
	var options = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true};
	navigator.geolocation.watchPosition(upDatePin, geoError, options);
}
function upDatePin(position){
	var myLat = position.coords.latitude;
	var myLong = position.coords.longitude;
	var latlong = new google.maps.LatLng(myLat, myLong);
	var pin;
	pin = new google.maps.Marker({
		position: latlong, 
		map: map
	});
}
function geoError(error){
	alert("Cannot find location error code: " + error.code + "\n" + error.message);
}