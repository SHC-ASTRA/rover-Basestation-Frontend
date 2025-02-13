/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Children, JSXElementConstructor, ReactNode } from "react";
class vector3 extends React.Component
{
	children : ReactNode;
	type!: string | JSXElementConstructor<any>; 
	key! : string;

	x : number;
	y : number;
	z : number;

	constructor(type : string | JSXElementConstructor<any>, key : string, X : number, Y : number, Z : number)
	{
		super(Children);
		this.type=type;
		this.key=key;

		this.x=X;
		this.y=Y;
		this.z=Z;
	}

	render() {
	  return <h2>Hi, I am a Car!</h2>;
	}

	ReactPortal() {

	}
}
export default vector3;