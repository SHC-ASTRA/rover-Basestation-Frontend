import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { AutoFeedbackData, CoreFeedbackData, DigitFeedbackData, FaerieFeedbackData, SocketFeedbackData } from "./types";

/**
 * Custom hook to setup the websocket connection and handle incoming messages
 */
export const useWebSocketSetup = () => {
    // storing data in state to trigger re-renders
    const [autoFeedback, setAutoFeedback] = useState<null | AutoFeedbackData>(null);
    const [coreFeedback, setCoreFeedback] = useState<null | CoreFeedbackData>(null);
    const [digitFeedback, setDigitFeedback] = useState<null | DigitFeedbackData>(null);
    const [faerieFeedback, setFaerieFeedback] = useState<null | FaerieFeedbackData>(null);
    const [socketFeedback, setSocketFeedback] = useState<null | SocketFeedbackData>(null);

    // determine the websocket url based on the current url
    const host = window.location.host;
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const url = `${protocol}//${host}/api/ws`;

    // use the react-use-websocket hook to handle the websocket connection
    const { sendMessage, lastMessage, readyState } = useWebSocket(url);

    // do a thing when lastMessage changes (when we get a websocket message)
    useEffect(() => {
        // make sure we actually have a message
        if (lastMessage !== null) {
            // parse the data from the message
            const data = JSON.parse(lastMessage.data);

            // put the data in the right place based on the type
            switch (data.type) {
                case 'feedback:core/auto':
                    setAutoFeedback(data);
                    break;
                case 'feedback:core':
                    setCoreFeedback(data);
                    break;
                case 'feedback:core/digit':
                    setDigitFeedback(data);
                    break;
                case 'feedback:core/faerie':
                    setFaerieFeedback(data);
                    break;
                case 'feedback:arm/socket':
                    setSocketFeedback(data);
                    break;
            }
        }
    }, [lastMessage]);

    // return the data and the function to send messages
    // each of the feedback types is returned separately so that components can choose which ones they want to use
    return {
        sendMessage,
        readyState,
        autoFeedback,
        coreFeedback,
        digitFeedback,
        faerieFeedback,
        socketFeedback,
    };
}
