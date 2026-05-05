"use strict";

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VybGlua2F1ciIsImEiOiJjbHExYjM4cHUwNzE3MnBud25qNDlmc2VjIn0.Jeu9BD0h1vILAwXce8dQqw';
const trackBtn = document.querySelector('.track');
const mapContainer = document.getElementById('map');

const deliveryMap = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [0, 0],
    zoom: 17,
    pitch: 50
});

const packageMarker = new mapboxgl.Marker({ color: '#d6313f' });

function lockMapInteraction() {
    deliveryMap.scrollZoom.disable();
    deliveryMap.dragPan.disable();
    deliveryMap.keyboard.disable();
    deliveryMap.doubleClickZoom.disable();
    deliveryMap.touchZoomRotate.disable();
}

lockMapInteraction();

function onPositionSuccess(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    console.log(`Package found — lat: ${lat}, lng: ${lng}`);
    deliveryMap.setCenter([lng, lat]);
    packageMarker.setLngLat([lng, lat]).addTo(deliveryMap);
}

function onPositionError() {
    console.warn('Could not determine package location.');
}

const geoOptions = {
    enableHighAccuracy: true
};

trackBtn.addEventListener('click', function () {
    if (!('geolocation' in navigator)) {
        console.warn('Geolocation is not available in this browser.');
        return;
    }

    mapContainer.style.display = 'block';
    setTimeout(function () {
        deliveryMap.resize();
        mapContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 150);

    navigator.geolocation.getCurrentPosition(onPositionSuccess, onPositionError, geoOptions);
});