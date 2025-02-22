import BioFeedback from '../../components/arm/BioFeedback';
import Arm_Socket_Component from './subcomponent/Socket';

export default function Arm_Bio_Component() {
	return <>
		<div className="feeback container">
			<Arm_Socket_Component />
		</div>
		<div className="control container">
			<BioFeedback />
		</div>
	</>
}