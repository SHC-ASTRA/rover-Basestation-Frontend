import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

const coords: LatLngTuple = [38.4063, -110.7918];

export default function MapComponent() {
    const [map, setMap] = useState<L.Map | null>(null);

    useEffect(() => {
        const newMap = L.map('map', { scrollWheelZoom: true, zoomControl: true }).setView(coords, 15);

        // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '© OpenStreetMap',
        // }).addTo(newMap);
        L.tileLayer.wms("/map", { // Base URL of your QGIS Server
            layers: 'utah_terrain', // The 'Short name' of your layer from QGIS Project Properties > QGIS Server
            format: 'image/png',
            transparent: true,
            version: '1.3.0', // WMS version
            crs: L.CRS.EPSG4326, // Or EPSG3857 if your QGIS project is in that and you prefer it
            attribution: 'Utah Terrain &copy; USGS | Served by QGIS Server'
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