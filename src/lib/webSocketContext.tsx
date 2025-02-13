import { createContext } from 'react';
import { ArmIKData } from './webSocketTypes';
import { ArmManualData } from './webSocketTypes';
import { CoreControlData } from './webSocketTypes';
import { CoreFeedbackData } from './webSocketTypes';
import { AutoFeedbackData } from './webSocketTypes';
import { DigitFeedbackData } from './webSocketTypes';
import { FaerieFeedbackData } from './webSocketTypes';
import { SocketFeedbackData } from './webSocketTypes';

export const CoreFeedbackContext = createContext<null | CoreFeedbackData>(null);
export const CoreDrivingContext = createContext<null | CoreControlData>(null);


export const AutoFeedbackContext = createContext<null | AutoFeedbackData>(null);


export const ArmIKControlContext = createContext<null | ArmIKData>(null);
export const ArmManualControlContext = createContext<null | ArmManualData>(null);
export const ArmSocketContext = createContext<null | SocketFeedbackData>(null);

export const ArmDigitContext = createContext<null | DigitFeedbackData>(null);
export const ArmFaerieContext = createContext<null | FaerieFeedbackData>(null);
