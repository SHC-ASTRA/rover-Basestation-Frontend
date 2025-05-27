import useWebSocketSetup from "../../lib/webSocket";

export default function BioFeedback() {
    const { coreFeedback, bioFeedback } = useWebSocketSetup();

    return <>
        {/* put the gnss & the altitude */}
        <div className="vertical-split">
            <div className="">
                <div className="horizontal-split">
                    <div className="vertical-split container">
                        <h2>GNSS</h2>
                        <div className="vertical-split">
                            <h3>
                                Latitude:&nbsp;
                                <span>{coreFeedback?.data.gps_lat.toPrecision(7) || "no data"}&nbsp;&deg;N</span>
                            </h3>
                            <h3>
                                Longitude:&nbsp;
                                <span>{coreFeedback?.data.gps_long.toPrecision(7) || "no data"}&nbsp;&deg;E</span>
                            </h3>
                        </div>
                    </div>
                    <div className="vertical-split container">
                        <h2>Altitude</h2>
                        <h3>{coreFeedback?.data.bmp_alt || "no data"}&nbsp;m</h3>
                    </div>
                </div>
                <div className="horizontal-split">
                    <div className="vertical-split container">
                        <h2>Temperature</h2>
                        <h3>
                            {bioFeedback?.data.drill_temp || "no data"}&nbsp;&deg;C
                        </h3>
                    </div>
                    <div className="vertical-split container">
                        <h2>Humidity</h2>
                        <h3>{bioFeedback?.data.drill_humidity || "no data"}&nbsp;%</h3>
                    </div>
                </div>
            </div>
        </div>
    </>;
}