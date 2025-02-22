import Arm_Digit from '../../components/arm/ArmDigitSource';
import Arm_Socket_Component from './subcomponent/Socket';

export default function Arm_Digit_Component() {
	return <>
		<div className="feedback container">
			<Arm_Socket_Component />
		</div>
		<div className="control container">
			<Arm_Digit />
		</div>
	</>
} 