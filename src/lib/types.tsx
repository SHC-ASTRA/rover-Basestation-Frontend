export class Vector2 {
    x: number;
    y: number;

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get angle() {
        return Math.atan2(this.y, this.x);
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Vector3 {
    x: number;
    y: number;
    z: number;

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    get direction() {
        return new Vector3(this.x / this.magnitude, this.y / this.magnitude, this.z / this.magnitude);
    }

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
