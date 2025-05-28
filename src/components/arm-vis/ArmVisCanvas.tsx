import { useEffect, useRef, useState } from "react"
import ArmVisDraw from "./ArmVisDraw"
import ArmVisRoverFeedback from "./ArmVisRoverFeedback";

const Id = "ArmVisId"

export default function ArmVisCanvas() {
    const vis_canvas = useRef(null)

    const [contextInit, setContextInit] = useState(false);

    useEffect(() => {
        const cas = vis_canvas.current

        if (cas == null) {
            setContextInit(false);
        } else {
            setContextInit(true);
        }

    }, []);

    return <div className="arm-vis-div">
        <canvas id={Id} ref={vis_canvas} width={800} height={900}></canvas>
        {contextInit ? <ArmVisDraw canvasCtx={vis_canvas.current.getContext("webgl2")} /> : null}
        <ArmVisRoverFeedback />
    </div>
}