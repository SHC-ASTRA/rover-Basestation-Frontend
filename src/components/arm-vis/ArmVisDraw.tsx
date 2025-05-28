import { ArmVis } from "./pkg/rust_wasm_vis"
import turret from "../../assets/models/_Turret_Assembly.stl?raw"
import axis0 from "../../assets/models/_AXIS_0.stl?raw"
import axis1 from "../../assets/models/_AXIS_1.stl?raw"
import axis2 from "../../assets/models/_AXIS_2.stl?raw"
import axis3 from "../../assets/models/_AXIS_3.stl?raw"
import axis4 from "../../assets/models/_AXIS_4.stl?raw"
import endEffector from "../../assets/models/_END_EFFECTOR.stl?raw"
import urdf from "../../assets/models/arm11.urdf?raw"
import vert from "../../assets/shaders/vert.glsl?raw"
import frag from "../../assets/shaders/frag.glsl?raw"
import { useEffect, useState } from "react";

export class ArmVisClasss {
    static vis: ArmVis;
    static constructed = false;
    static angle_data = [0.0, 0.0, 0.0, 0.0, 0.0];

    static new(ctx: WebGL2RenderingContext): void {
        if (!this.constructed) {
            this.vis = ArmVis.new(ctx);
        }
    }

    static update(encoder_data: number[]): void {
        this.angle_data = encoder_data;
    }
}
//import ArmVis from "./pkg/rust_wasm_vis"
export default function ArmVisDraw(props: { canvasCtx: WebGL2RenderingContext }) {
    //console.log(frag);
    const [sourcesPushed, setSourcesPueshed] = useState(false);
    const [visInit, setVisInit] = useState(false);

    useEffect(() => {

        ArmVisClasss.new(props.canvasCtx);
        const ArmVisual = ArmVisClasss.vis;

        function push_sources() {
            if (!sourcesPushed) {
                ArmVisual.push_model_sources(turret)
                ArmVisual.push_model_sources(axis0);
                ArmVisual.push_model_sources(axis1);
                ArmVisual.push_model_sources(axis2);
                ArmVisual.push_model_sources(axis3);
                ArmVisual.push_model_sources(axis4);
                ArmVisual.push_urdf_source(urdf);
                setSourcesPueshed(true);

            } else {
                ;
            }
        }

        push_sources();

        if (!visInit) {
            ArmVisual.init();
            ArmVisual.load_shaders(vert, frag);
            setVisInit(true);
        } else {
            ;
        }

        const pass = new Float32Array(ArmVisClasss.angle_data);
        ArmVisual.update_joint_angles(pass)
        ArmVisual.main();

    }, []);

    return <div className="test">

    </div>
}