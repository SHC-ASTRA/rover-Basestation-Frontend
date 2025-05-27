import {vis} from "./render.ts";

class arm_angle_data {
  encoder_angles:number[] = [0.0, 0.0, 0.0, 0.0, 0.0];

  incAxis(axis: number, angle: number):void {
      switch (axis) {
          case 0 :
              this.encoder_angles[0] += angle;
              let x = new Float32Array(this.encoder_angles)
              vis.update_joint_angles(x);
              break;
          case 1 :
              this.encoder_angles[1] += angle;
              const y = new Float32Array(this.encoder_angles)
              vis.update_joint_angles(y);
              break;
          case 2 :
              this.encoder_angles[2] += angle;
              const z = new Float32Array(this.encoder_angles)
              vis.update_joint_angles(z);
              break;
          case 3 :
              this.encoder_angles[3] += angle;
              const w = new Float32Array(this.encoder_angles)
              vis.update_joint_angles(w);
              break;
          case 4 :
              this.encoder_angles[4] += angle;
              const r = new Float32Array(this.encoder_angles)
              vis.update_joint_angles(r);
              break;
      }
  }
}

export let encoder_values = new arm_angle_data();
