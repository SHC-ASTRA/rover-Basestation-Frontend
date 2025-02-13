import vector3 from './vector3';
export interface WebSocketData {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string] : any;
}

export interface CoreFeedbackData extends WebSocketData {
    type: 'feedback:core';
    data: {
        gps_lat: number;
        gps_long: number;
        gps_sats: number;

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