import { useEffect, useState } from "react";
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

const HMITab = ({ machines }) => {
	const [machineStates, setMachineStates] = useState(
		machines.map((machine) => ({
			id: machine.id,
			isRunning: false,
			uptime: 0, // seconds
		})),
	);

	const [globalCounter, setGlobalCounter] = useState(0);
	const [lastProductionTime, setLastProductionTime] = useState(0);

	// Timer logic
	useEffect(() => {
		const interval = setInterval(() => {
			setMachineStates((prev) =>
				prev.map((state) => {
					if (state.isRunning) {
						const newUptime = state.uptime + 1;

						// Check if any machine has been running for 5 seconds
						if (
							state.id === "4" &&
							newUptime % 5 === 0 &&
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
			prev.map((state) =>
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
						<p className="counter-note">
							+1 every 5s when any machine is running
						</p>
					</div>

					<div className="hmi-grid">
						{machines.map((machine) => {
							const state = machineStates.find((s) => s.id === machine.id) || {
								isRunning: false,
								uptime: 0,
							};

							return (
								<div key={machine.id} className="hmi-machine-panel">
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
									<div className="machine-controls">
										<button
											type="button"
											className="industrial-btn start-btn"
											onClick={() => toggleMachine(machine.id, "start")}
											disabled={state.isRunning}
										>
											START
										</button>

										<button
											type="button"
											className="industrial-btn stop-btn"
											onClick={() => toggleMachine(machine.id, "stop")}
											disabled={!state.isRunning}
										>
											STOP
										</button>

										<button
											type="button"
											className="industrial-btn reset-btn"
											onClick={() => toggleMachine(machine.id, "reset")}
										>
											<RotateCcw className="reset-icon" />
											RESET TIMER
										</button>
									</div>
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
