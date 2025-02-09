export interface WebSocketData {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string] : any;
}

interface CoreFeedbackData extends WebSocketData {
    type: 'feedback:core';
    telemetry: { // i don't know what this is supposed to be, so here is some temp data
        battery: number;
        temperature: number;
        humidity: number;
    };
}
export default CoreFeedbackData;