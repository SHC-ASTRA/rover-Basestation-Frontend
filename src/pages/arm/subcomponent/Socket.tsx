import Container from '../../../components/Container'
import Arm_Socket from '../../../components/arm/ArmSocketSource'

export default function Arm_Socket_Component() {
	return (
		<>
			<Container padUp='var(--buttonHeight)' padRight='var(--stdPad)' padDown='var(--stdPad)' padLeft='var(--stdPad)' widthSize='var(--stdContainerWidth)' heightSize='var(--stdContainerHeight)'>
				<Arm_Socket />
			</Container>
		</>
	);
}
