import { MapContainer, WMSTileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L, { LatLngTuple, Icon, DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useWebSocketSetup from "../lib/webSocket";
import { useEffect } from 'react';

const coords: LatLngTuple = [38.4063, -110.7918];
const ZOOM_LEVEL = 15;

// Fix for default marker icons in react-leaflet
// This is needed because the marker icons are not properly loaded by default
const defaultIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

// Center button component that accesses the map instance
function CenterButton() {
    const map = useMap();

    const handleCenterMap = () => {
        map.flyTo(coords);
    };

    return (
        <div className='map-controls' style={{ flexGrow: 0, display: "flex" }}>
            <button
                className='map-control-button'
                style={{ flexGrow: 1 }}
                onClick={handleCenterMap}
            >
                Center
            </button>
        </div>
    );
}

// Create a component for rover location marker that uses the websocket data
function RoverLocationMarker() {
    const { coreFeedback, autoFeedback } = useWebSocketSetup();
    const map = useMap();

    // Update map view to center on rover when location changes
    useEffect(() => {
        if (coreFeedback?.data?.gps_lat && coreFeedback?.data?.gps_long) {
            map.setView([coreFeedback.data.gps_lat, coreFeedback.data.gps_long], map.getZoom());
        }
    }, [coreFeedback?.data?.gps_lat, coreFeedback?.data?.gps_long, map]);

    // Don't render anything if no data
    if (!coreFeedback?.data?.gps_lat || !coreFeedback?.data?.gps_long) {
        return null;
    }

    // Create a rotatable rover icon
    const roverOrientation = coreFeedback.data.orientation || 0;

    // Create a custom div icon with CSS rotation based on orientation
    const roverIcon = new L.DivIcon({
        className: 'rover-marker-container',
        html: `
            <div style="
                width: 50px; 
                height: 50px; 
                display: flex; 
                justify-content: center; 
                align-items: center;
                transform: rotate(${roverOrientation}deg);
            ">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="#0078FF">
                    <path d="M12 2L8 8H16L12 2Z"/>
                    <circle cx="12" cy="14" r="6" stroke="white" stroke-width="2" fill="#0078FF"/>
                </svg>
            </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -15]
    });

    const targetIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        className: 'target-marker'
    });

    return (
        <>
            {/* Rover current location marker */}
            <Marker
                position={[coreFeedback.data.gps_lat, coreFeedback.data.gps_long]}
                icon={roverIcon}
            >
                <Popup>
                    Rover Current Location<br />
                    Lat: {coreFeedback.data.gps_lat.toFixed(6)}<br />
                    Long: {coreFeedback.data.gps_long.toFixed(6)}<br />
                    Satellites: {coreFeedback.data.gps_sats}<br />
                    Orientation: {coreFeedback.data.orientation}°
                </Popup>
            </Marker>

            {/* Target location marker if available */}
            {autoFeedback?.data?.target_latitude && autoFeedback?.data?.target_longitude && (
                <Marker
                    position={[autoFeedback.data.target_latitude, autoFeedback.data.target_longitude]}
                    icon={targetIcon}
                >
                    <Popup>
                        Target Location<br />
                        Lat: {autoFeedback.data.target_latitude.toFixed(6)}<br />
                        Long: {autoFeedback.data.target_longitude.toFixed(6)}<br />
                        Mission: {autoFeedback.data.mission_type}<br />
                        Remaining: {autoFeedback.data.remaining_distance} m
                    </Popup>
                </Marker>
            )}
        </>
    );
}

export default function MapComponent() {
    return (
        <>
            <MapContainer
                id="map"
                center={coords}
                zoom={ZOOM_LEVEL}
                scrollWheelZoom={true}
                zoomControl={true}
                style={{ width: '100%', height: '100%' }}
            >
                <WMSTileLayer
                    url="/map"
                    layers="utah_terrain"
                    format="image/png"
                    transparent={true}
                    version="1.3.0"
                    crs={L.CRS.EPSG4326}
                    attribution="Utah Terrain &copy; USGS | Served by QGIS Server"
                />

                <RoverLocationMarker />
                <CenterButton />
            </MapContainer>
        </>
    );
}