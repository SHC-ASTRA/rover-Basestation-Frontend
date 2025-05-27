const canvasarea = document.getElementById("cavas");
import { vis } from "./render";
import { encoder_values } from "./arm.ts";

// TODO Better input system
// TODO Actually learn typescript instead of guessing



class Axis {
    axis_num = 0;

    change_axis (num: number):void{
        this.axis_num =  num;
    }
}

let tester = new Axis();

class MouseDragDelta {
    x_delta     : number = 0
    y_delta     : number = 0
    x_start     : number = 0
    y_start     : number = 0
    mouse_down  : boolean = false

    mouse_start (x: number, y: number):void{
        this.x_start = x;
        this.y_start = y;
    }

    mouse_move (x: number, y: number):void{
        this.x_delta = x;
        this.y_delta = y;
        this.calc_delta();
    }
    
    calc_delta():[number, number]{
        //console.log("Inside" + " " + (this.x_start-this.x_delta) + " " + (this.y_start-this.y_delta));
        return [this.x_start-this.x_delta, this.y_start-this.y_delta];
    }

    update_start():void{
        this.x_start = this.x_delta;
        this.y_start = this.y_delta;
    }
}

let r = new MouseDragDelta();

export function listenToKeyboard() {
    canvasarea?.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "KeyA":
                console.log("Turning 0");
                tester.change_axis(0);
                break;
            case "KeyS":
                console.log("Turing 1");
                tester.change_axis(1);
                break;
            case "KeyD":
                console.log("Turning 2");
                tester.change_axis(2);
                break;
            case "KeyF":
                console.log("Turing 3");
                tester.change_axis(3);
                break;
            case "KeyG":
                console.log("Turing 4");
                tester.change_axis(4);
                break;
        }
    });
}

let end_toggle = false;

export function listenToMouse (canvas: HTMLElement) {
    canvasarea?.addEventListener("mousedown", (e) => {
        r.mouse_down = true;
        const boundingRect = canvas.getBoundingClientRect();
        
        const scaleX = canvas.clientWidth / boundingRect.width;
        const scaleY = canvas.clientHeight   / boundingRect.height;

        const canvasLeft = (e.clientX - boundingRect.left) * scaleX;
        const canvasTop = (e.clientY - boundingRect.top) * scaleY;
        console.log("Clicky" + " " + canvasLeft + " " + canvasTop);

        if (!end_toggle) {
            end_toggle = true;
            listenForMouseDelta(canvas);
            listenForMouseUp(canvas);
        }
        r.mouse_start(canvasLeft, canvasTop);
    });
}

function listenForMouseDelta (canvas: HTMLElement) {
    canvasarea?.addEventListener("mousemove", (e) => {
        const boundingRect = canvas.getBoundingClientRect();

        const scaleX = canvas.clientWidth / boundingRect.width;
        const scaleY = canvas.clientHeight / boundingRect.height;
        const canvasLeft = (e.clientX - boundingRect.left) * scaleX;
        const canvasTop = (e.clientY - boundingRect.top) * scaleY;

        if (r.mouse_down) {
           r.mouse_move(canvasLeft, canvasTop);
           let data = r.calc_delta(); 
           r.update_start();

            if (data[0] != 0.0) {
                if (data[0] > 0) {
                    encoder_values.incAxis(tester.axis_num, -3.0)
                    //vis.rotate_static(encoder_values.encoder_angles)
                    //vis.rotate(-20.0, tester.axis_num);
                    //console.log("Greater than 0" ,data[0]);
                } else if (data[0] < 0) {
                    //vis.rotate(20.0, tester.axis_num);
                    encoder_values.incAxis(tester.axis_num, 3.0);
                    //console.log("Less than 0" ,data[0]);
                }
            }
        }
    },  { capture: false });
}

function listenForMouseUp (canvas: HTMLElement) {
    canvasarea?.addEventListener("mouseup", (e) => {
        r.mouse_down = false;
        const boundingRect = canvas.getBoundingClientRect();

        const scaleX = canvas.clientWidth / boundingRect.width;
        const scaleY = canvas.clientHeight / boundingRect.height;
        const canvasLeft = (e.clientX - boundingRect.left) * scaleX;
        const canvasTop = (e.clientY - boundingRect.top) * scaleY;
        console.log("Up" + " " + canvasLeft + " " + canvasTop);
        //vis.rotate(90, tester.axis_num);
    });
}

function listenForMouseScroll (canvas: HTMLElement) {
    canvasarea?.addEventListener("wheel", (e) => {
        const boundingRect = canvas.getBoundingClientRect();
        console.log(e.deltaZ); 
        const scaleX = canvas.clientWidth / boundingRect.width;
        const scaleY = canvas.clientHeight / boundingRect.height;
        const canvasLeft = (e.clientX - boundingRect.left) * scaleX;
        const canvasTop = (e.clientY - boundingRect.top) * scaleY;
        console.log("Scroll" + " " + canvasLeft + " " + canvasTop);
    })
}
