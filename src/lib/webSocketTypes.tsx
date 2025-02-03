export interface WebSocketData {
    type: string;
    [key: string]: any;
}

export interface CoreFeedbackData extends WebSocketData {
    type: 'core_feedback';
    telemetry: { // i don't know what this is supposed to be, so here is some temp data
        battery: number;
        temperature: number;
        humidity: number;
    };
}