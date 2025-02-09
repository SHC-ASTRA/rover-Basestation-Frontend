import { createContext } from 'react';
import CoreFeedbackData from './webSocketTypes';

const CoreFeedbackContext = createContext<null | CoreFeedbackData>(null);
export default CoreFeedbackContext;