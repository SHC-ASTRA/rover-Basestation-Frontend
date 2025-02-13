import Arm_Socket from './Socket';
import Container from '../dev/Container';
import Arm_Bio from '../sources/ArmBio';

export default function Arm_Bio_Component()
{
	return (
		<>
			<Arm_Socket />
			<Container padUp='var(--buttonHeight)' padRight='12px' padDown='12px' padLeft='12px' widthSize='var(--standardSourceWidth)' heightSize='var(--standardSourceHeight)'>
				<Arm_Bio />
			</Container>
		</>
	);
} 