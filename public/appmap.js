import "https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js"

const mapbox_token = "pk.eyJ1IjoiaG9uZ2FuaDEyMyIsImEiOiJja2hxY2NsbTAwajd0MnVtZ21xeXV2d3N1In0.5IngRRfPJPmRcMftpWTu7w"

mapboxgl.accessToken = mapbox_token;

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/dark-v10',
	zoom: 1.5,
	center: [0,20]
});

var nameDisplay = document.getElementById('name');
var meteIdDisplay = document.getElementById('meteId');
var recclassDisplay = document.getElementById('recclass');
var fallDisplay = document.getElementById('Fall');
var geolocationDisplay = document.getElementById('Geolocation');

fetch("/meteorite.json")
.then(response => response.json())
.then(data => {
	const { reports } = data;

	reports.forEach(report => {
		var markerHeight = 20, markerRadius = 10, linearOffset = 15;
		var popupOffsets = {
			'top': [0, 0],
			'top-left': [0,0],
			'top-right': [0,0],
			'bottom': [0, -markerHeight],
			'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
			'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
			'left': [markerRadius, (markerHeight - markerRadius) * -1],
			'right': [-markerRadius, (markerHeight - markerRadius) * -1]
		};

		var marker = new mapboxgl.Marker({})
    	.setLngLat(report.geolocation.coordinates)
	    .addTo(map);

	    var popup = new mapboxgl.Popup({
	    	offset:popupOffsets,
	    	closeButton: false,
			closeOnClick: false
		})
		.setHTML('<h3>' + report.name + '</h3><p>' + report.geolocation.coordinates + '</p><p>Click for more detail</p>')
		;

	    const element = marker.getElement();
		element.id = 'marker'

		marker.getElement().addEventListener('click', () => {
			nameDisplay.textContent = report.name;
			meteIdDisplay.textContent = report.meteId;
			recclassDisplay.textContent = report.recclass;
			fallDisplay.textContent = report.fall;
			geolocationDisplay.textContent = report.geolocation.coordinates;
		});

		element.addEventListener('mouseenter', () => popup.addTo(map));
		element.addEventListener('mouseleave', () => popup.remove());

		marker.setPopup(popup);
		
	});
});