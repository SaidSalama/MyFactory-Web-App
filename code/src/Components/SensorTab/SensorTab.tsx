import React, { useContext, useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../Card/Card";
import "./SensorTab.css";
import type { Sensor } from "../../../models/sensor";
import { SensorsContext } from "../../DataProvider";
import type { ApiResponse } from "../../models/api_response";
import SensorAPI_Service from "../../Services/sensor_api_service";

const SensorTab = ({ filterData }) => {
	const Sensors = useContext(SensorsContext);
	if (!Sensors) return <p>Loading</p>;

	return (
		<div className="sensors-bg-container">
			{/* Industrial background */}
			<div className="sensors-bg-overlay" />

			<div className="sensors-content">
				<Card className="sensors-main-card">
					<CardHeader>
						<CardTitle className="sensors-title">Sensors</CardTitle>
						<CardDescription className="sensors-desc">
							Real-time sensor data across the factory
						</CardDescription>
					</CardHeader>

					<CardContent>
						<div className="sensors-grid">
							{filterData(Sensors?.data, ["name"]).map((sensor: Sensor) => (
								<div key={sensor.sensor_id} className="sensor-card">
									<div className="sensor-header">
										<h3 className="sensor-name">{sensor.name}</h3>
										<p className="sensor-unit">{sensor.type.name || ""}</p>
										<div
											className={`sensor-value-dot ${sensor.value === 1 ? "off" : "on"}`}
										/>
									</div>

									<div className="sensor-value">{sensor.value}</div>

									<div className="sensor-location">
										<p>Machine: {sensor.machine.name} </p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default SensorTab;
