import { MapContainer, WMSTileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L, { LatLngTuple, Icon, ControlOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useWebSocketSetup from "../lib/webSocket";
import { useEffect } from 'react';
import { createControlComponent } from '@react-leaflet/core';

const coords: LatLngTuple = [38.4063, -110.7918];
const ZOOM_LEVEL = 15;

// Global state for follow mode - using a ref so it can be accessed across components
const followRoverRef = { current: true };

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

// Create a custom control for the follow rover toggle
class FollowControl extends L.Control {
    options: ControlOptions = {
        position: 'bottomright'
    }

    onAdd() {
        const container = L.DomUtil.create('div', 'leaflet-control leaflet-control-custom');
        container.style.padding = '5px';
        container.style.backgroundColor = 'var(--crust)';
        container.style.color = 'var(--text)';
        container.style.borderRadius = '4px';
        container.style.boxShadow = '0 1px 5px rgba(0,0,0,0.4)';
        container.style.marginBottom = '10px';

        const label = L.DomUtil.create('label', 'follow-switch-label', container);
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.cursor = 'pointer';

        const switchInput = L.DomUtil.create('input', 'follow-switch-input', label);
        switchInput.type = 'checkbox';
        switchInput.checked = followRoverRef.current;
        switchInput.style.margin = '0 8px 0 0';

        const text = L.DomUtil.create('span', 'follow-switch-text', label);
        text.innerHTML = 'Follow Rover';
        text.style.fontSize = '12px';
        text.style.fontWeight = 'bold';

        L.DomEvent.on(switchInput, 'change', function (e) {
            L.DomEvent.stopPropagation(e);
            followRoverRef.current = switchInput.checked;
        });

        // Prevent map click events when interacting with the control
        L.DomEvent.disableClickPropagation(container);

        return container;
    }
}

// Create a custom control for the center button
class CenterControl extends L.Control {
    options: ControlOptions = {
        position: 'bottomright'
    }

    onAdd(map: { flyTo: (arg0: L.LatLngTuple) => void; }) {
        const container = L.DomUtil.create('div', 'leaflet-control leaflet-control-custom');
        container.style.padding = '5px';
        container.style.backgroundColor = 'var(--crust)';
        container.style.borderRadius = '4px';
        container.style.boxShadow = '0 1px 5px rgba(0,0,0,0.4)';
        container.style.color = 'var(--text)';

        const button = L.DomUtil.create('button', 'center-button', container);
        button.innerHTML = 'Center';
        button.style.padding = '6px 10px';
        button.style.cursor = 'pointer';
        button.style.border = 'none';
        button.style.backgroundColor = 'var(--surface-1)';
        button.style.color = 'var(--text)';
        button.style.borderRadius = '3px';
        button.style.fontWeight = 'bold';

        L.DomEvent.on(button, 'click', function (e) {
            L.DomEvent.stopPropagation(e);
            map.flyTo(coords);
        });

        return container;
    }
}

// Create a custom control for GPS information display
class GPSInfoControl extends L.Control {
    options: ControlOptions = {
        position: 'topright'
    }

    onAdd() {
        const container = L.DomUtil.create('div', 'leaflet-control leaflet-control-custom gps-info');
        container.style.padding = '10px';
        container.style.backgroundColor = 'var(--crust)';
        container.style.borderRadius = '4px';
        container.style.boxShadow = '0 1px 5px rgba(0,0,0,0.4)';
        container.style.minWidth = '200px';
        container.style.fontSize = '12px';
        container.style.fontFamily = 'monospace';
        container.style.color = 'var(--text)';
        container.id = 'gps-info-container';

        const title = L.DomUtil.create('div', 'gps-info-title', container);
        title.innerHTML = '<strong>GPS Information</strong>';
        title.style.marginBottom = '5px';

        const latDiv = L.DomUtil.create('div', 'gps-info-lat', container);
        latDiv.id = 'gps-info-lat';
        latDiv.innerHTML = 'Latitude: ---.-------';

        const lngDiv = L.DomUtil.create('div', 'gps-info-lng', container);
        lngDiv.id = 'gps-info-lng';
        lngDiv.innerHTML = 'Longitude: ---.-------';

        const satDiv = L.DomUtil.create('div', 'gps-info-sats', container);
        satDiv.id = 'gps-info-sats';
        satDiv.innerHTML = 'Satellites: --';

        // Prevent map click events when interacting with the control
        L.DomEvent.disableClickPropagation(container);

        return container;
    }
}

// Create a react-leaflet wrapper for our custom controls
const CenterButton = createControlComponent(props => new CenterControl(props));
const FollowSwitch = createControlComponent(props => new FollowControl(props));
const GPSInfo = createControlComponent(props => new GPSInfoControl(props));

// Component to update the GPS info display
function GPSInfoUpdater() {
    const { coreFeedback } = useWebSocketSetup();

    useEffect(() => {
        if (coreFeedback?.data?.gps_lat && coreFeedback?.data?.gps_long) {
            const latElement = document.getElementById('gps-info-lat');
            const lngElement = document.getElementById('gps-info-lng');
            const satElement = document.getElementById('gps-info-sats');

            if (latElement) {
                latElement.innerHTML = `Latitude: ${coreFeedback.data.gps_lat.toFixed(7)}`;
            }

            if (lngElement) {
                lngElement.innerHTML = `Longitude: ${coreFeedback.data.gps_long.toFixed(7)}`;
            }

            if (satElement) {
                satElement.innerHTML = `Satellites: ${coreFeedback.data.gps_sats || '--'}`;
            }
        }
    }, [coreFeedback?.data]);

    return null;
}

// Create a component for rover location marker that uses the websocket data
function RoverLocationMarker() {
    const { coreFeedback, autoFeedback } = useWebSocketSetup();
    const map = useMap();

    // Update map view to center on rover when location changes
    useEffect(() => {
        if (coreFeedback?.data?.gps_lat && coreFeedback?.data?.gps_long && followRoverRef.current) {
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
                    Lat: {coreFeedback.data.gps_lat.toFixed(7)}<br />
                    Long: {coreFeedback.data.gps_long.toFixed(7)}<br />
                    Satellites: {coreFeedback.data.gps_sats}<br />
                    Orientation: {coreFeedback.data.orientation}°
                </Popup>
            </Marker>

            {/* Target location marker if available */}
            {autoFeedback?.data?.target_lat && autoFeedback?.data?.target_long && (
                <Marker
                    position={[autoFeedback.data.target_lat, autoFeedback.data.target_long]}
                    icon={targetIcon}
                >
                    <Popup>
                        Target Location<br />
                        Lat: {autoFeedback.data.target_lat.toFixed(7)}<br />
                        Long: {autoFeedback.data.target_long.toFixed(7)}<br />
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
                <GPSInfoUpdater />
                <GPSInfo position="topright" />
                <FollowSwitch position="bottomright" />
                <CenterButton position="bottomright" />
            </MapContainer>
        </>
    );
}