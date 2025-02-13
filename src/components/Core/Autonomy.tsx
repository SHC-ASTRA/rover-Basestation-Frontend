import Container from '../dev/Container';
import Core_Feedback from '../sources/CoreFeedback';
import Auto_Feedback from '../sources/AutoFeedback';
export default function Core_Autonomy_Component()
{	
	return (
		<>
			<Core_Feedback />
			<Container padUp='var(--buttonHeight)' padRight='12px' padDown='12px' padLeft='12px' widthSize='var(--standardSourceWidth)' heightSize='var(--standardSourceHeight)'>
				<Auto_Feedback />
			</Container>
		</>
	);
}