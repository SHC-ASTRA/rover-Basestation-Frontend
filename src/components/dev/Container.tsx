import "./dev.css";
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react"

function Container(props: {
		children: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined , 
		padUp : string,
		padRight : string,
		padDown : string,
		padLeft : string,
	
		widthSize : string,
		heightSize : string,
	}){

	return (
		<div style={
			{
				'paddingTop':props.padUp,
				'paddingRight':props.padRight,
				'paddingBottom':props.padDown,
				'paddingLeft':props.padLeft,

				'width':props.widthSize,
				'height':props.heightSize
			} as React.CSSProperties
		}
		>
			{props.children}
		</div>
	);
}
export default Container;