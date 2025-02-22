import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

const coords: LatLngTuple = [38.39800, -110.7920];

export default function MapComponent() {
    useEffect(() => {
        const map = L.map('map', { scrollWheelZoom: false, zoomControl: false }).setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
        }).addTo(map);

        return () => {
            map.off();
            map.remove();
        }
    }, []);

    return (
        <div id="map">
        </div >
    );
}