import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react"

function Container(props: {
	children: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined,
	marginUp: string,
	marginRight: string,
	marginDown: string,
	marginLeft: string,

	widthSize: string,
	heightSize: string,
}) {

	return (
		<div style={
			{
				'marginTop': props.marginUp,
				'marginRight': props.marginRight,
				'marginBottom': props.marginDown,
				'marginLeft': props.marginLeft,

				'width': props.widthSize,
				'height': props.heightSize,
				'border': '3px',
				'borderStyle': 'solid'
			} as React.CSSProperties
		}
		>
			{props.children}
		</div>
	);
}
export default Container;