import React, { useEffect, useState } from "react";
import "./MachineTab.css";
import { createContext, useContext } from "react";
import type { Machine } from "../../../models/machine";
import { MachinesContext } from "../../DataProvider";
import type { ApiResponse } from "../../models/api_response";
import MachineAPI_Service from "../../Services/machine_api_service";
import { Card, CardContent, CardHeader } from "../Card/Card";

const MachineTab = ({ filterData }) => {
	const Machines = useContext(MachinesContext);
	/*const [machiness, setMachiness] = useState<ApiResponse<Machine[]> | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<unknown>(null);
	useEffect(() => {
		const fetchMachines = async () => {
			try {
				const response = await new MachineAPI_Service().selectAll();
				//console.log(`response is ${response}`);
				setMachiness(response);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchMachines();
	}, []);
	if (loading) return <p>Loading</p>;
	if (error) return <p>Error</p>;
	console.log(machiness?.data?.[0]);*/
	return (
		<div className="machines-hardcore-bg">
			<div className="machines-hardcore-content">
				<Card className="machines-hardcore-card">
					<CardHeader className="hardcore-header">
						<div className="title-container">
							<h1 className="machines-hardcore-title">MACHINES</h1>
							{/*<div className="scanline" />*/}
						</div>
						<p className="machines-hardcore-subtitle">
							PRODUCTION LINE MONITORING SYSTEM
						</p>
					</CardHeader>

					<CardContent>
						<div className="machines-hardcore-grid">
							{filterData(Machines?.data, ["name"]).map((machine: Machine) => (
								<div
									key={machine.machine_id}
									className="machine-hardcore-panel"
								>
									<div className="panel-top">
										<div className="machine-id">{machine.machine_id}</div>
										<div className={`status-led ${machine.status.value}`} />
									</div>

									<h2 className="machine-hardcore-name">{machine.name}</h2>

									<div className="hardcore-stats">
										<div className="stat-row">
											<span>Efficency</span>
											<span className="value">
												{machine.efficency}
												<small>%</small>
											</span>
										</div>

										<div className="stat-row">
											<span>Last Maintenance</span>
											<span className="date">
												{machine.last_maintenance?.toString()}
											</span>
										</div>

										<div className="stat-row">
											<span>Location</span>
											<span className="date">{machine.location.name}</span>
										</div>
									</div>

									{/* Brutal progress bar */}
									<div className="efficiency-bar">
										<div
											className="fill"
											style={{ width: `${machine.efficency}%` }}
										/>
										<div className="glare" />
									</div>

									<div className={`status-text ${machine.status.value}`}>
										{machine.status.value.toUpperCase()}
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
export default MachineTab;
