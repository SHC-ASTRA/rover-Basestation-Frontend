import { createContext } from 'react';
import { CoreFeedbackData } from './webSocketTypes';
import { CoreDrivingData } from './webSocketTypes';
import { ArmDigitData } from './webSocketTypes';
import { ArmBioData } from './webSocketTypes';

export const CoreFeedbackContext = createContext<null | CoreFeedbackData>(null);
export const CoreDrivingContext = createContext<null | CoreDrivingData>(null);

export const ArmDigitContext = createContext<null | ArmDigitData>(null);
export const ArmBioContext = createContext<null | ArmBioData>(null);
