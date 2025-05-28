import { useRef } from "react"
import ArmVisDraw from "./ArmVisDraw"
import ArmVisRoverFeedback from "./ArmVisRoverFeedback";

const Id = "ArmVisId"

export default function ArmVisCanvas() {
    const vis_canvas = useRef<HTMLCanvasElement | null>(null)

    return <div className="arm-vis-div">
        <canvas id={Id} ref={vis_canvas} width={800} height={900}></canvas>
        {vis_canvas.current ? <ArmVisDraw canvasCtx={vis_canvas.current.getContext("webgl2")!} /> : null}
        <ArmVisRoverFeedback />
    </div>
}