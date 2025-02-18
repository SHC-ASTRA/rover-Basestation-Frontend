import { useEffect, useState } from "react";
import vector3 from "./vector3";
import useWebSocket from "react-use-websocket";
export interface WebSocketData {
    type: string;
    timestamp: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string] : any;
}

export interface CoreFeedbackData extends WebSocketData {
    type: 'feedback:core';
    data: {
        gps_lat : number;
        gps_long : number;
        gps_sats : number;

		bno_gyro : vector3;
		bno_accel : vector3;

		orientation : number;

		bmp_temp : number;
		bmp_alt : number;
		bmp_pres : number;

		bat_voltage : number;
		voltage_12 : number;
		voltage_5 : number;
		voltage_3 : number;
    };
}

export interface CoreControlData extends WebSocketData {
    type: 'control:core/driving';
    data: {
        left_stick : number;
        right_stick : number;
        
		max_speed : number;

		brake : boolean;
    };
}
export interface AutoFeedbackData extends WebSocketData {
    type: 'feedback:core/auto';
    data: {
		mission_type : number
        
		target_latitude : number;
        target_longitude : number;
        
		remaining_distance : number;
		
		update : string;
		current_job : string;
		warning : string;
    };
}


export interface SocketFeedbackData extends WebSocketData {
    type: 'feedback:arm/socket';
    data: {
        axis0_angle : number;
        axis0_temperature : number;
        axis0_voltage : number;
        axis0_current : number;
        
        axis1_angle : number;
        axis1_temperature : number;
        axis1_voltage : number;
        axis1_current : number;
        
        axis2_angle : number;
        axis2_temperature : number;
        axis2_voltage : number;
        axis2_current : number;
        
        axis3_angle : number;
        axis3_temperature : number;
        axis3_voltage : number;
        axis3_current : number;
        
        voltage_battery : number;
		voltage_12v : number;
		voltage_5v : number;
		voltage_3v : number;
    };
}
export interface ArmManualData extends WebSocketData {
    type: 'control:arm/socket_manual';
    data: {
        axis0 : number;
        axis1 : number;
        axis2 : number;
        axis3 : number;

        effector_roll : number;
        effector_yaw : number;
        
		gripper : number;
		linear_actuator : number;
		
		laser : number;
    };
}
export interface ArmIKData extends WebSocketData {
    type: 'control:arm/socket_ik';
    data: {
        gripper : number;
        linear_actuator : number;
        
		laser : number;

		effector_roll : number;
		effector_yaw : number;
    };
}
export interface DigitFeedbackData extends WebSocketData {
    type: 'feedback:arm/digit';
    data: {
        wrist_angle : number;
        
        voltage_battery : number;
		voltage_12v : number;
		voltage_5v : number;
    };
}
export interface FaerieFeedbackData extends WebSocketData {
    type: 'feedback:arm/faerie';
    data: {
        voltage_battery : number;
        voltage_12v : number;
        voltage_5v : number;
        
		sht_temp : number;
		sht_humidity : number;
		lux_1 : number;
		lux_2 : number;
		lux_3 : number;
		lux_4 : number;
		lux_5 : number;
		lux_6 : number;
		lux_7 : number;
    };
}

export class AllFeedbackData {
    coreFeedback: CoreFeedbackData | null = null;
    autoFeedback: AutoFeedbackData | null = null;
    digitFeedback: DigitFeedbackData | null = null;
    faerieFeedback: FaerieFeedbackData | null = null;
    socketFeedback: SocketFeedbackData | null = null;
}

/**
 * Custom hook to setup the websocket connection and handle incoming messages
 */
export function useWebSocketSetup() {
    // storing data in state to trigger re-renders
    const [webSocketData, setWebSocketData] = useState<AllFeedbackData>(new AllFeedbackData());

    // determine the websocket url based on the current url
    const host = window.location.host;
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const url = `${protocol}//${host}/api/ws`;

    // use the react-use-websocket hook to handle the websocket connection
    const { sendMessage, lastMessage, readyState} = useWebSocket(url);

    // do a thing when lastMessage changes (when we get a websocket message)
    useEffect(() => {
        // make sure we actually have a message
        if (lastMessage !== null) {
            // parse the data from the message
            const data = JSON.parse(lastMessage.data);
            const newWsData = webSocketData;

            // put the data in the right place based on the type
            switch (data.type) {
                case 'feedback:core/auto':
                    newWsData.autoFeedback = data;
                    break;
                case 'feedback:core':
                    newWsData.coreFeedback = data;
                    break;
                case 'feedback:core/digit':
                    newWsData.digitFeedback = data;
                    break;
                case 'feedback:core/faerie':
                    newWsData.faerieFeedback = data;
                    break;
                case 'feedback:arm/socket':
                    newWsData.socketFeedback = data;
                    break;
            }

            // update the state with the new data
            setWebSocketData(newWsData);
        }
    }, [lastMessage, webSocketData]);
    
    // return the data and the function to send messages
    // each of the feedback types is returned separately so that components can choose which ones they want to use
    return {
        sendMessage,
        readyState,
        autoFeedback: webSocketData.autoFeedback,
        coreFeedback: webSocketData.coreFeedback,
        digitFeedback: webSocketData.digitFeedback,
        faerieFeedback: webSocketData.faerieFeedback,
        socketFeedback: webSocketData.socketFeedback,
    };
}