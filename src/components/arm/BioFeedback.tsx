import useWebSocketSetup from '../../lib/webSocket';

export default function BioFeedback() {
	const { faerieFeedback } = useWebSocketSetup();

	return <>
		<h1>Arm Bio</h1>
		{faerieFeedback && (
			<div>
				<p>Voltage Battery: {faerieFeedback.data.bat_voltage}</p>
				<p>Voltage (12v): {faerieFeedback.data.voltage_12}</p>
				<p>Voltage (5v): {faerieFeedback.data.voltage_5}</p>

				<p>Scabbard Temperature: {faerieFeedback.data.sht_temp}</p>
				<p>Scabbard Humidity: {faerieFeedback.data.sht_humidity}</p>

				<p>lux 1: {faerieFeedback.data.lux_1}</p>
				<p>lux 2: {faerieFeedback.data.lux_2}</p>
				<p>lux 3: {faerieFeedback.data.lux_3}</p>
				<p>lux 4: {faerieFeedback.data.lux_4}</p>
				<p>lux 5: {faerieFeedback.data.lux_5}</p>
				<p>lux 6: {faerieFeedback.data.lux_6}</p>
				<p>lux 7: {faerieFeedback.data.lux_7}</p>
			</div>
		) || <p>No Arm Bio</p>}
	</>;
}