import Arm_Socket from './Socket';
import Container from '../dev/Container'

export default function Arm_Digit()
{
	return (
		<>
		<Arm_Socket />
			<Container padUp='12px' padRight='12px' padDown='12px' padLeft='12px' widthSize='100vw' heightSize='100vw'>
				<h1>Hi, I'm Arm/Digit</h1>
			</Container>
		</>
	);
} 