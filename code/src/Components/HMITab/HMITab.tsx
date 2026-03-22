import { useContext, useEffect, useState } from "react";
import Badge from "..//Badge/Badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../Card/Card";
import "./HMITab.css"; // Your new CSS file
import { Factory, RotateCcw } from "lucide-react";
import type { Coils } from "../../../models/coils";
import type { Holding_Reg } from "../../../models/holding_register";
import type { Machine } from "../../../models/machine";
import { MachinesContext } from "../../DataProvider";
import MachineAPI_Service from "../../Services/machine_api_service";
import PLC_API_Service from "../../Services/plc_api_service";

//import MachinesComponent from "../MachineTab/machine_test";

const HMITab = ({ filterData }) => {
	const Machines = useContext(MachinesContext); //machines context to get all machines of the factory

	const [machineStates, setMachineStates] = useState(
		Machines?.data?.map((machine) => ({
			id: machine.machine_id,
			isRunning: false,
			uptime: 0, // seconds
		})),
	);
	const [Errormsg, setErrormsg] = useState("");
	const [globalCounter, setGlobalCounter] = useState(0);

	// Timer logic
	useEffect(() => {
		const interval = setInterval(() => {
			setMachineStates((prev) =>
				prev?.map((state) => {
					if (state.isRunning) {
						const newUptime = state.uptime + 1;

						// Check if any machine has been running for 5 seconds
						if (
							//state.id === 1 && //last machine that put the final product
							newUptime % 5 === 0 &&
							//every 5 seconds a the machine run a product is produced
							newUptime > state.uptime
						) {
							setGlobalCounter((c) => c + 1);
						}

						return { ...state, uptime: newUptime };
					}
					return state;
				}),
			);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const toggleMachine = (id, action) => {
		setMachineStates((prev) =>
			prev?.map((state) =>
				state.id === id
					? {
							...state,
							isRunning: action === "start" ? true : false,
							uptime: action === "reset" ? 0 : state.uptime,
						}
					: state,
			),
		);
	};

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	// a function that send a number to holding registers of the plc
	/*const sendToPLC = async (data:Holding_Reg) => {
		try {
			await new PLC_API_Service().send(data);
		} catch (err) {
			console.log(`error of sending to plc is ${err}`);
		}
	};*/

	// a function that send turn on and off a coil
	const writeCoil = async (data: Coils) => {
		try {
			const response = await new PLC_API_Service().writecoil(data);
			if (response.status !== 200) {
				return false;
			}
			return true;
		} catch (err) {
			console.log(`error of sending to plc is ${err}`);
			return false;
		}
	};

	const updateMachine = async (data: Partial<Machine>) => {
		try {
			const response = await new MachineAPI_Service().update_status(data);
			if (response.status === 400) {
				setErrormsg(response.message);
				return false;
			}
			return true;
		} catch (err) {
			console.log(`error of update machine is ${err}`);
			setErrormsg("failed to update machine status");
			return false;
		}
	};
	return (
		<div className="hmi-industrial-container">
			<Card className="hmi-main-card">
				<CardHeader>
					<div className="hmi-header">
						<Factory className="hmi-icon" />
						<div>
							<CardTitle className="hmi-title">HMI Control Panel</CardTitle>
							<CardDescription className="hmi-desc">
								Direct control of production machines
							</CardDescription>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					{/* Global Production Counter */}
					<div className="global-counter-panel">
						<h3 className="counter-title">Total Parts Produced</h3>
						<div className="counter-value">{globalCounter}</div>
						<p style={{ color: "red" }}>{Errormsg}</p>
					</div>

					<div className="hmi-grid">
						{filterData(Machines?.data, ["name"]).map((machine: Machine) => {
							const state = machineStates?.find(
								(s) => s.id === machine.machine_id,
							) || {
								isRunning: false,
								uptime: 0,
							};

							return (
								<div key={machine.machine_id} className="hmi-machine-panel">
									<div className="machine-header">
										<h3 className="machine-name">{machine.name}</h3>
										<Badge
											variant={state.isRunning ? "operational" : "destructive"}
										>
											{state.isRunning ? "RUNNING" : "STOPPED"}
										</Badge>
									</div>

									<div className="machine-timer">
										<span className="timer-label">Uptime</span>
										<span className="timer-value">
											{formatTime(state.uptime)}
										</span>
									</div>

									{/* Real industrial buttons — separate START / STOP */}
									{machine.status_id !== 6 ? (
										<div className="machine-controls">
											<button
												type="button"
												className="industrial-btn start-btn"
												onClick={async () => {
													// 1. Wait for writeCoil result
													const success = await writeCoil({
														address: machine.machine_id - 1,
														value: true,
													});

													// 2. Only toggleMachine if writeCoil succeeded
													if (success) {
														toggleMachine(machine.machine_id, "start");
														setErrormsg("");
													} else {
														setErrormsg("Can't connect to your machine *");
													}
													//3. Change the status of the machine(Running)
													await updateMachine({
														machine_id: machine.machine_id,
														status_id: 4,
													});
												}}
												disabled={machine.status_id === 4}
											>
												START
											</button>

											<button
												type="button"
												className="industrial-btn stop-btn"
												onClick={async () => {
													toggleMachine(machine.machine_id, "stop");
													writeCoil({
														address: machine.machine_id - 1,
														value: false,
													});
													await updateMachine({
														machine_id: machine.machine_id,
														status_id: 5,
													});
												}}
												disabled={machine.status_id === 5}
											>
												STOP
											</button>

											<button
												type="button"
												className="industrial-btn reset-btn"
												onClick={() =>
													toggleMachine(machine.machine_id, "reset")
												}
											>
												<RotateCcw className="reset-icon" />
												RESET TIMER
											</button>
										</div>
									) : (
										<p style={{ color: "red" }}>
											This machine is blocked and can't be controlled
										</p>
									)}
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default HMITab;
