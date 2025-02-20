import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { AllFeedbackData } from "./types";

/**
 * Custom hook to setup the websocket connection and handle incoming messages
 */
export const useWebSocketSetup = () => {
    // storing data in state to trigger re-renders
    const [webSocketData, setWebSocketData] = useState<AllFeedbackData>(new AllFeedbackData());

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
