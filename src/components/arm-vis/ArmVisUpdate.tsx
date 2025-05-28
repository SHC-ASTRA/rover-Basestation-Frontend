import { ArmVisClasss } from "./ArmVisDraw";

export default function ArmVisUpdate(props: { feedbackData: number[] }) {

    ArmVisClasss.update(props.feedbackData);
    return <div className="update">
    </div>
}