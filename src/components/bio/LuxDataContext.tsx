import { createContext } from "react";
import { FaerieFeedbackData } from "../../lib/types";

const LuxDataContext = createContext<(FaerieFeedbackData["data"] & { timestamp: number })[]>([]);

export default LuxDataContext;