import L from 'leaflet';
import marcar from '../assets/marker.png';
import marker from '../assets/location.png';


export const Location = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    iconAnchor: [11, 0],
    popupAnchor: [11, 0],
    iconSize: new L.Point(40, 40),
});


export const Icon = new L.Icon({
    iconUrl: marcar,
    iconRetinaUrl: marcar,
    iconAnchor: [11, 0],
    popupAnchor: [11, 0],
    iconSize: new L.Point(45, 45),
});