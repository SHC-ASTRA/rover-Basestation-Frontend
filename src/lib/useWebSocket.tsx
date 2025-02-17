import { WebSocketData } from './webSocketTypes';
import React, { useEffect, useCallback, useState, useRef } from 'react';

export interface Handlers {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.Dispatch<React.SetStateAction<any>>;
}

export const WebsocketAddress = 'ws://localhost/api/ws';

const useWebSocket = (url: string, handlers: Handlers) => {
  const [retryDelay, setRetryDelay] = useState(500);
  const ws = useRef<WebSocket | null>(null);

  const handleMessage = useCallback((message: MessageEvent) => {
    // triggers once we get a message
    try {
      // attempt to parse data and select a handler for our data type
      const data: WebSocketData = JSON.parse(message.data);
      const handler = handlers[data.type];
      if (handler) {
        // if there was a handler for our data type, call it
        //console.log(data);
        handler(data);
      }
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
    }
  }, [handlers]);

  const connect = useCallback(() => {
    // create a new WebSocket connection
    if (ws.current) {
      // close existing connection before opening a new one
      ws.current.close();
    }

    ws.current = new WebSocket(url);

    //ws.current.onopen = () => console.log('WebSocket connected');
    ws.current.onmessage = handleMessage;
    //ws.current.onerror = (error) => console.error('WebSocket error:', error);
    ws.current.onclose = () => {
      //console.log('WebSocket disconnected, retrying in ' + retryDelay + 'ms');
      
      // reconnect after delay
      setTimeout(() => {
        if (!ws.current) {
          return;
        }
        ws.current = null;
        setRetryDelay(Math.min(50000, retryDelay * 2));

        // TODO: add exponential backoff retry delay
        //connect();
      }, retryDelay);
    }
  }, [url, handleMessage, retryDelay]);

  useEffect(() => {
    // connect to WebSocket when component mounts
    connect();
  }, [connect]);
};

export default useWebSocket;