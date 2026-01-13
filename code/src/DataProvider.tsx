import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import type { Demand } from "../models/demand";
import type { Machine } from "../models/machine";
import type { Sensor } from "../models/sensor";
import type { Task } from "../models/task";
import type { Users as Usertype } from "../models/users";
import type { ApiResponse } from "./models/api_response";
import DemandAPI_Service from "./Services/demand_api_service";
import MachineAPI_Service from "./Services/machine_api_service";
import SensorAPI_Service from "./Services/sensor_api_service";
import TaskAPI_Service from "./Services/task_api_service";
import UsersAPI_Service from "./Services/users_api_service";

export const MachinesContext = createContext<ApiResponse<Machine[]> | null>(
	null,
);
export const UsersContext = createContext<ApiResponse<Usertype[]> | null>(null);
export const SensorsContext = createContext<ApiResponse<Sensor[]> | null>(null);
export const DemandContext = createContext<ApiResponse<Demand[]> | null>(null);
export const TaskContext = createContext<ApiResponse<Task[]> | null>(null);

const DataProvider = ({ children }: { children: ReactNode }) => {
	//states to store data fetched
	const [machines, setMachines] = useState<ApiResponse<Machine[]> | null>(null);
	const [users, setUsers] = useState<ApiResponse<Usertype[]> | null>(null);
	const [sensors, setSensors] = useState<ApiResponse<Sensor[]> | null>(null);
	const [demands, setDemands] = useState<ApiResponse<Demand[]> | null>(null);
	const [tasks, setTasks] = useState<ApiResponse<Task[]> | null>(null);

	/*fetching machines from databases */
	useEffect(() => {
		const fetchMachines = async () => {
			try {
				const response = await new MachineAPI_Service().selectAll();
				setMachines(response);
			} catch (err) {
				console.error(err);
			}
		};

		fetchMachines();
	}, []);

	/*fetching users from databases */
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await new UsersAPI_Service().selectAll();
				//console.log(`users are ${response.data}`);
				setUsers(response);
			} catch (err) {
				console.log(`error is ${err}`);
			}
		};
		fetchUsers();
	}, []);

	/*fetching sensors from databases */
	useEffect(() => {
		const fetchSensors = async () => {
			try {
				const response = await new SensorAPI_Service().selectAll();
				//console.log(`response is ${response}`);
				setSensors(response);
			} catch (err) {
				console.log(`error is ${err}`);
			}
		};

		fetchSensors();
	}, []);

	/*fetching demands from databases */
	useEffect(() => {
		const fetchDemands = async () => {
			try {
				const response = await new DemandAPI_Service().selectAll();
				console.log(`demands are  ${response.data}`);
				setDemands(response);
			} catch (err) {
				console.log(`error is ${err}`);
			}
		};
		fetchDemands();
	}, []);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await new TaskAPI_Service().selectAll();
				console.log(`response is ${response}`);
				setTasks(response);
			} catch (err) {
				console.log(`error is ${err}`);
			}
		};

		fetchTasks();
	}, []);

	return (
		<SensorsContext.Provider value={sensors}>
			<UsersContext.Provider value={users}>
				<MachinesContext.Provider value={machines}>
					<DemandContext.Provider value={demands}>
						<TaskContext.Provider value={tasks}>
							{children}
						</TaskContext.Provider>
					</DemandContext.Provider>
				</MachinesContext.Provider>
			</UsersContext.Provider>
		</SensorsContext.Provider>
	);
};

export default DataProvider;
