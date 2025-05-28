import { useState, useEffect } from "react";
import { PtzControlData } from "../../lib/types";
import useWebSocketSetup from "../../lib/webSocket";

const emptyPtzControlData: PtzControlData["data"] = {
    control_mode: 0,
    turn_yaw: 0,
    turn_pitch: 0,
    yaw: 0,
    pitch: 0,
    axis_id: 0,
    angle: 0,
    zoom_level: 0,
    stream_type: 0,
    stream_freq: 0,
    reset: false,
}

export function PTZControls() {
    const { sendMessage } = useWebSocketSetup();
    const [targetPosition, _setTargetPosition] = useState({ yaw: 0, pitch: 0 });
    const [targetZoom, _setTargetZoom] = useState({ zoom_level: 1 });

    function setTargetPosition(newPosition: { yaw: number, pitch: number }) {
        // clamp yaw between -135 and 135
        const clampedYaw = Math.max(-135, Math.min(135, newPosition.yaw));
        // clamp pitch between -90 and 90
        const clampedPitch = Math.max(-90, Math.min(90, newPosition.pitch));
        _setTargetPosition({ yaw: clampedYaw, pitch: clampedPitch });
    }

    function setTargetZoom(newZoom: { zoom_level: number }) {
        const clampedZoomLevel = Math.max(1, Math.min(6, newZoom.zoom_level));
        _setTargetZoom({ zoom_level: clampedZoomLevel });
    }

    useEffect(() => {
        const data: PtzControlData = {
            type: '/ptz/control',
            timestamp: Date.now(),
            data: {
                ...emptyPtzControlData,
                ...targetPosition,
                control_mode: 1,
            }
        };

        sendMessage(JSON.stringify(data));
    }, [sendMessage, targetPosition]);

    useEffect(() => {
        const data: PtzControlData = {
            type: '/ptz/control',
            timestamp: Date.now(),
            data: {
                ...emptyPtzControlData,
                ...targetZoom,
                control_mode: 3,
            }
        };

        sendMessage(JSON.stringify(data));
    }, [sendMessage, targetZoom]);

    {/* need cardinal movement and then zoom in and out */ }
    return <>
        <div className="vertical-split container">
            <h2>PTZ Controls</h2>
            <div className="horizontal-split">
                <div className="vertical-split">
                    <button className="control-button" disabled={true}>&nbsp;</button>
                    <button className="control-button" onClick={() => setTargetPosition({ yaw: targetPosition.yaw + 5, pitch: targetPosition.pitch })}>Left</button>
                    <button className="control-button" disabled={true}>&nbsp;</button>
                </div>
                <div className="vertical-split">
                    <button className="control-button" onClick={() => setTargetPosition({ yaw: targetPosition.yaw, pitch: targetPosition.pitch + 5 })}>Up</button>
                    <button className="control-button" onClick={() => setTargetPosition({ ...targetPosition })}>O</button>
                    <button className="control-button" onClick={() => setTargetPosition({ yaw: targetPosition.yaw, pitch: targetPosition.pitch - 5 })}>Down</button>
                </div>
                <div className="vertical-split">
                    <button className="control-button" disabled={true}>&nbsp;</button>
                    <button className="control-button" onClick={() => setTargetPosition({ yaw: targetPosition.yaw - 5, pitch: targetPosition.pitch })}>Right</button>
                    <button className="control-button" disabled={true}>&nbsp;</button>
                </div>
            </div>
            <br />
            <div className="horizontal-split">
                <button className="control-button" onClick={() => setTargetZoom({ zoom_level: targetZoom.zoom_level - 0.5 })}>-</button>
                <button className="control-button" onClick={() => setTargetZoom({ zoom_level: targetZoom.zoom_level + 0.5 })}>+</button>
            </div>
            <br />
            <div className="horizontal-split">
                <h2>yaw: {targetPosition.yaw}</h2>
                <h2>pitch: {targetPosition.pitch}</h2>
                <h2>zoom: {targetZoom.zoom_level}</h2>
            </div>
            <br />
            <button className="control-button" onClick={() => {
                setTargetPosition({ yaw: 0, pitch: 0 });
                setTargetZoom({ zoom_level: 0 });
                const data: PtzControlData = {
                    type: '/ptz/control',
                    timestamp: Date.now(),
                    data: {
                        ...emptyPtzControlData,
                        reset: true,
                    }
                };
                sendMessage(JSON.stringify(data));
            }}>Reset Position</button>
        </div>
    </>
}
