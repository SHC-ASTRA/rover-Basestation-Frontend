import { createContext } from "react";
import { FaerieFeedbackData } from "../../lib/types";

const BioDataContext = createContext<(FaerieFeedbackData["data"] & { timestamp: number })[]>([]);

export default BioDataContext;