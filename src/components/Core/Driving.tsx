import Container from '../dev/Container';
import Core_Driving from '../sources/CoreDriving';

export default function Core_Driving_Component()
{
	return (
		<>
			<Container padUp='var(--buttonHeight)' padRight='12px' padDown='12px' padLeft='12px' widthSize='var(--standardSourceWidth)' heightSize='var(--standardSourceHeight)'>
				<Core_Driving />
			</Container>
		</>
	);
} 