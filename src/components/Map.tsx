import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

const coords: LatLngTuple = [38.39800, -110.7920];

export default function MapComponent() {
    const [map, setMap] = useState<L.Map | null>(null);

    useEffect(() => {
        const newMap = L.map('map', { scrollWheelZoom: false, zoomControl: false }).setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
        }).addTo(newMap);

        setMap(newMap);

        return () => {
            newMap.off();
            newMap.remove();
            setMap(null);
        }
    }, []);

    return <>
        <div id="map">
        </div >
        <div className='map-controls' style={{ flexGrow: 0, display: "flex" }}>
            <button className='map-control-button' style={{ flexGrow: 1 }} onClick={() => map && map.flyTo(coords)}>Center</button>
        </div>
    </>;
}