import { createContext } from 'react';
import { CoreFeedbackData } from './webSocketTypes';

export const CoreFeedbackContext = createContext<null | CoreFeedbackData>(null);