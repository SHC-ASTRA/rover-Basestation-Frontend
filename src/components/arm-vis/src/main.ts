import {Render, vis} from './render'
import { listenToKeyboard, listenToMouse} from './input';

import vert_shader from "../shaders/vert.glsl?raw"
import frag_shader from "../shaders/frag.glsl?raw"

import turret from "../models/_Turret_Assembly.stl?raw"
import axis0 from "../models/_AXIS_0.stl?raw"
import axis1 from "../models/_AXIS_1.stl?raw"
import axis2 from "../models/_AXIS_2.stl?raw"
import axis3 from "../models/_AXIS_3.stl?raw"
import axis4 from "../models/_AXIS_4.stl?raw"
import end_effector from "../models/_AXIS_3.stl?raw"

import urdf from "../models/arm11.urdf?raw"


vis.push_model_sources(turret);
//vis.push_model_sources(test);
vis.push_model_sources(axis0);
vis.push_model_sources(axis1);
vis.push_model_sources(axis2);
vis.push_model_sources(axis3);
vis.push_model_sources(axis4);
vis.push_urdf_source(urdf);


// TODO Clean up code
// TODO Refactor
// TODO Add Comments
// TODO Websockets?
// TODO Need to clean out all the unused .stl files
// TODO CSS styling?
// TODO add UI overlay for controlling certain features?

console.log("main.ts entry");



const visualization_area = document.getElementById("cavas")!;
listenToMouse(visualization_area);
listenToKeyboard();
vis.init();
vis.load_shaders(vert_shader, frag_shader);
Render();



console.log("main.ts exit");