import ControllerDisplay from "../components/Controller";
import CoreFeedbackComponent from "./core/subcomponent/Feedback";

export default function DebugPage() {
    return <>
        <div className='container'>
            <CoreFeedbackComponent />
        </div>
        <div className='container'>
            <ControllerDisplay />
        </div>
    </>
}