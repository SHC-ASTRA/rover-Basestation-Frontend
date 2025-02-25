import useWebSocketSetup from "../../lib/webSocket";
import MotorTempIndicator from "../indicators/MotorTempIndicator";
import { VoltageIndicator_12, VoltageIndicator_3_3, VoltageIndicator_5, VoltageIndicator_battery } from "../indicators/VoltageIndicator";
import { BaseCurrentIndicator } from "../indicators/CurrentIndicators";
import AngleIndicator from "../indicators/AngleIndicator";

export default function ArmSocketFeedback() {
	const { socketFeedback } = useWebSocketSetup();

	return <>
		{/* TO DO: implement a cool wasm rendering goober here instead */}
		<div className="container indicator-subsection">
			<h1>Arm Socket</h1>
			<div>
				{socketFeedback && (
					<>
						<div className="horizontal-split">
							<AngleIndicator label="Axis0" current_angle={socketFeedback.data.axis0_angle} />
							<AngleIndicator label="Axis1" current_angle={socketFeedback.data.axis1_angle} />
							<AngleIndicator label="Axis2" current_angle={socketFeedback.data.axis2_angle} />
							<AngleIndicator label="Axis3" current_angle={socketFeedback.data.axis3_angle} />
						</div>

						<div className="horizontal-split">
							<div className="container indicator-subsection">
								<h2 className="indicator-subsection-label">Axis 0</h2>
								<MotorTempIndicator temperature={socketFeedback.data.axis0_temp} />
								<VoltageIndicator_battery voltage={socketFeedback.data.axis0_voltage} />
								<BaseCurrentIndicator current={socketFeedback.data.axis0_current} />
							</div>

							<div className="container indicator-subsection">
								<h2 className="indicator-subsection-label">Axis 1</h2>
								<MotorTempIndicator temperature={socketFeedback.data.axis1_temp} />
								<VoltageIndicator_battery voltage={socketFeedback.data.axis1_voltage} />
								<BaseCurrentIndicator current={socketFeedback.data.axis1_current} />
							</div>
						</div>

						<div className="horizontal-split">
							<div className="container indicator-subsection">
								<h2 className="indicator-subsection-label">Axis 2</h2>
								<MotorTempIndicator temperature={socketFeedback.data.axis2_temp} />
								<VoltageIndicator_battery voltage={socketFeedback.data.axis2_voltage} />
								<BaseCurrentIndicator current={socketFeedback.data.axis2_current} />
							</div>

							<div className="container indicator-subsection">
								<h2 className="indicator-subsection-label">Axis 3</h2>
								<MotorTempIndicator temperature={socketFeedback.data.axis3_temp} />
								<VoltageIndicator_battery voltage={socketFeedback.data.axis3_voltage} />
								<BaseCurrentIndicator current={socketFeedback.data.axis3_current} />
							</div>
						</div>

						<div className="container indicator-subsection">
							<h2 className="indicator-subsection-label">System Voltages</h2>
							<div className="horizontal-split">
								<div>
									<VoltageIndicator_battery label="Battery" voltage={socketFeedback.data.bat_voltage} />
									<VoltageIndicator_12 label="12V" voltage={socketFeedback.data.voltage_12} />
								</div>
								<div>
									<VoltageIndicator_5 label="5V" voltage={socketFeedback.data.voltage_5} />
									<VoltageIndicator_3_3 label="3V" voltage={socketFeedback.data.voltage_3} />
								</div>
							</div>
						</div>
					</>
				) || <p>No arm socket feedback.</p>}
			</div>
		</div>
	</>;
}