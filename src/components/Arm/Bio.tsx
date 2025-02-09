import Arm_Socket from './Socket';
import Container from '../dev/Container';

export default function Arm_Bio()
{
	return (
		<>
			<Arm_Socket />
			<Container padUp='12px' padRight='12px' padDown='12px' padLeft='12px' widthSize='12px' heightSize='12px'>
				<h1>Hi, I'm Arm/Bio</h1>
			</Container>
		</>
	);
} 