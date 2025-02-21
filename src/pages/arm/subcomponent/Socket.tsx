import Container from '../../../components/Container'
import Arm_Socket from '../../../components/arm/ArmSocketSource'

export default function Arm_Socket_Component() {
	return (
		<>
			<Container
				marginUp='var(--stdMargin)'
				marginRight='var(--stdMargin)'
				marginDown='var(--stdMargin)'
				marginLeft='var(--stdMargin)'
				widthSize='var(--stdContainerWidth)'
				heightSize='var(--stdContainerHeight)'
			>
				<Arm_Socket />
			</Container>
		</>
	);
}
