import {ArmVis} from '../pkg';


export const vis = ArmVis.new("cavas");

export function Render() {
    vis.main();
    requestAnimationFrame(Render);
}


