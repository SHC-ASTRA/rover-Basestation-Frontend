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


class ArmVisClasss {
    static vis: ArmVis;
    static made = false;

    static new(ctx: WebGL2RenderingContext): void {
        if (!this.made) {
            this.vis = ArmVis.new(ctx);
        }
    }
}
//import ArmVis from "./pkg/rust_wasm_vis"
export default function ArmVisDraw(props: { canvasCtx: WebGL2RenderingContext }) {
    //console.log(frag);
    const [sourcesPushed, setSourcesPueshed] = useState(false);
    const [visInit, setVisInit] = useState(false);

    useEffect(() => {

        ArmVisClasss.new(props.canvasCtx);
        let r = ArmVisClasss.vis;

        function push_sources() {
            if (!sourcesPushed) {
                console.log("RAN");

                //r.load_shaders(vert, frag);
                r.push_model_sources(turret)
                r.push_model_sources(axis0);
                r.push_model_sources(axis1);
                r.push_model_sources(axis2);
                r.push_model_sources(axis3);
                r.push_model_sources(axis4);
                //r.push_model_sources(endEffector);
                r.push_urdf_source(urdf);
                setSourcesPueshed(true);

            } else {
                ;
            }
        }

        push_sources();

        if (!visInit) {
            r.init();
            r.load_shaders(vert, frag);
            setVisInit(true);
        } else {
            ;
        }

        r.main();

    }, []);

    return <div className="test">

    </div>
}