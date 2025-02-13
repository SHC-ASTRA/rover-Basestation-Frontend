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

export interface CoreDrivingData extends WebSocketData {
    type: 'control:core';
    data: {
        left_stick : number;
        right_stick : number;
        
		max_speed : number

		brake : boolean;
    };
}
export interface ArmDigitData extends WebSocketData {
    type: 'feedback:arm';
    data: {
        wrist_angle : number;
        
        voltage_battery : number;
		voltage_12v : number
		voltage_5v : number;
    };
}
export interface ArmBioData extends WebSocketData {
    type: 'feedback:arm';
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
