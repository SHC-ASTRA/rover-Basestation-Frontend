import Container from '../dev/Container';
import Core_Feedback from '../sources/CoreFeedback';

export default function Core_Feedback_Component()
{	
	return (
		<Container padUp='12px' padRight='12px' padDown='12px' padLeft='12px' widthSize='100vw' heightSize='100vh'>
			<h1>Hi, I'm Core/Feedback</h1>
			<Core_Feedback />
		</Container>
	);
} 