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
<<<<<<< HEAD
import { webSocketClient } from "./Services/WebSocketClient";
=======
>>>>>>> 6d15baa (adding all previous work)

export const MachinesContext = createContext<ApiResponse<Machine[]> | null>(
	null,
);
export const UsersContext = createContext<ApiResponse<Usertype[]> | null>(null);
export const SensorsContext = createContext<ApiResponse<Sensor[]> | null>(null);
export const DemandContext = createContext<ApiResponse<Demand[]> | null>(null);
export const TaskContext = createContext<ApiResponse<Task[]> | null>(null);
<<<<<<< HEAD
export const AI_responseContext = createContext<string | null>(null);
=======
>>>>>>> 6d15baa (adding all previous work)

const DataProvider = ({ children }: { children: ReactNode }) => {
	//states to store data fetched
	const [machines, setMachines] = useState<ApiResponse<Machine[]> | null>(null);
	const [users, setUsers] = useState<ApiResponse<Usertype[]> | null>(null);
	const [sensors, setSensors] = useState<ApiResponse<Sensor[]> | null>(null);
	const [demands, setDemands] = useState<ApiResponse<Demand[]> | null>(null);
	const [tasks, setTasks] = useState<ApiResponse<Task[]> | null>(null);
<<<<<<< HEAD
	const [ai_response, setai_response] = useState<string | null>(null);

	/* WebSocket for real-time sensor creation */
	/* WebSocket for real-time sensor creation ONLY */
	useEffect(() => {
		// Connect to WebSocket
		webSocketClient.connect();

		// Handler that ONLY runs for sensor creation
		const handleSensorCreate = (data: any) => {
			console.log("🟢 WebSocket: NEW SENSOR DETECTED", data);

			// Get the new sensor from the message
			const newSensor: Sensor = data.data.record;
			console.log("📊 New sensor:", newSensor);

			// UPDATE THE SENSORS STATE
			setSensors((prev) => {
				//console.log('🔄 Updating state... Previous state:', prev?.data?.length || 0, 'sensors');

				// Case 1: No sensors loaded yet
				if (!prev) {
					console.log("📦 First sensor - creating initial state");
					return {
						status: 200,
						message: "Sensors",
						data: [newSensor],
					};
				}

				// Case 2: Sensors exist but no data array
				if (!prev.data) {
					console.log("📦 No data array - creating with new sensor");
					return {
						...prev,
						data: [newSensor],
					};
				}

				// Case 3: Check if sensor already exists (prevent duplicates)
				const sensorExists = prev?.data?.some(
					(sensor) => sensor.sensor_id === newSensor.sensor_id,
				);

				if (sensorExists) {
					console.log("⚠️ Sensor already exists, skipping");
					return prev;
				}

				//ADDING THE NEW SENSOR TO THE STATE
				return { ...prev, data: [...prev.data, newSensor] };
			});
		};
		//Handler that only runs for sensor deletion
		const handleSensorDelete = (data: any) => {
			console.log("🔴 Sensor deleted via WebSocket:", data);

			const deletedSensor = data.data.record;

			setSensors((prev) => {
				if (!prev || !prev.data) return prev;

				// Remove the deleted sensor
				return {
					...prev,
					data: prev.data.filter(
						(sensor) => sensor.sensor_id !== deletedSensor.sensor_id,
					),
				};
			});
		};
		//Handler of tasks creation
		const handleTaskCreate = (data: any) => {
			console.log("🟢 WebSocket: NEW TASK DETECTED", data);

			// Get the new sensor from the message
			const newTask: Task = data.data.record;
			console.log("📊 New task:", newTask);

			// UPDATE THE SENSORS STATE
			setTasks((prev) => {
				//console.log('🔄 Updating state... Previous state:', prev?.data?.length || 0, 'sensors');

				// Case 1: No sensors loaded yet
				if (!prev) {
					console.log("📦 First task - creating initial state");
					return {
						status: 200,
						message: "Sensors",
						data: [newTask],
					};
				}

				// Case 2: Sensors exist but no data array
				if (!prev.data) {
					console.log("📦 No data array - creating with new sensor");
					return {
						...prev,
						data: [newTask],
					};
				}

				// Case 3: Check if sensor already exists (prevent duplicates)
				const taskExists = prev?.data?.some(
					(task) => task.task_id === newTask.task_id,
				);

				if (taskExists) {
					console.log("⚠️ Task already exists, skipping");
					return prev;
				}

				//ADDING THE NEW SENSOR TO THE STATE
				return { ...prev, data: [...prev.data, newTask] };
			});
		};
		//Handler of task deletion
		const handleTaskDelete = (data: any) => {
			console.log("🔴 Task deleted via WebSocket:", data);

			const deletedTask = data.data.record;

			setTasks((prev) => {
				if (!prev || !prev.data) return prev;

				// Remove the deleted task
				return {
					...prev,
					data: prev.data.filter(
						(task) => task.task_id !== deletedTask.task_id,
					),
				};
			});
		};
		//Handler of the task update
		const handleTaskUpdate = (data: any) => {
			console.log("🟡 WebSocket: TASK UPDATED", data);

			const updatedTask: Task = data.data.record;
			console.log("📊 Updated task:", updatedTask);

			setTasks((prev) => {
				// Case 1: No state yet → nothing to update
				if (!prev || !prev.data) {
					console.log("⚠️ No tasks loaded yet");
					return prev;
				}

				// Case 2: Task does not exist → ignore
				const taskExists = prev.data.some(
					(task) => task.task_id === updatedTask.task_id,
				);

				if (!taskExists) {
					console.log("⚠️ Task not found, skipping update");
					return prev;
				}

				// Case 3: Replace the task
				return {
					...prev,
					data: prev.data.map((task) =>
						task.task_id === updatedTask.task_id
							? { ...task, ...updatedTask }
							: task,
					),
				};
			});
		};
		//Handler of user creation
		const handleUserCreate = (data: any) => {
			console.log("🟢 WebSocket: NEW USER DETECTED", data);

			// Get the new user from the message
			const newUser: Usertype = data.data.record;
			console.log("📊 New user:", newUser);

			// UPDATE THE USERS STATE
			setUsers((prev) => {
				//console.log('🔄 Updating state... Previous state:', prev?.data?.length || 0, 'sensors');

				// Case 1: No user loaded yet
				if (!prev) {
					console.log("📦 First user - creating initial state");
					return {
						status: 200,
						message: "users",
						data: [newUser],
					};
				}

				// Case 2: users exist but no data array
				if (!prev.data) {
					console.log("📦 No data array - creating with new user");
					return {
						...prev,
						data: [newUser],
					};
				}

				// Case 3: Check if user already exists (prevent duplicates)
				const userExists = prev?.data?.some(
					(user) => user.user_id === newUser.user_id,
				);

				if (userExists) {
					console.log("⚠️ user already exists, skipping");
					return prev;
				}

				//ADDING THE NEW user TO THE STATE
				return { ...prev, data: [...prev.data, newUser] };
			});
		};
		//Handler of user deletion
		const handleUserDelete = (data: any) => {
			console.log("🔴 User deleted via WebSocket:", data);

			const deletedUser = data.data.record;

			setUsers((prev) => {
				if (!prev || !prev.data) return prev;

				// Remove the deleted sensor
				return {
					...prev,
					data: prev.data.filter(
						(user) => user.user_id !== deletedUser.user_id,
					),
				};
			});
		};

		// Handler that ONLY runs for sensor creation
		const handleMachineCreate = (data: any) => {
			console.log("🟢 WebSocket: NEW MACHINE DETECTED", data);

			// Get the new sensor from the message
			const newMachine: Machine = data.data.record;
			console.log("📊 New machine:", newMachine);

			// UPDATE THE SENSORS STATE
			setMachines((prev) => {
				// Case 1: No machines loaded yet
				if (!prev) {
					console.log("📦 First machine - creating initial state");
					return {
						status: 200,
						message: "Machines",
						data: [newMachine],
					};
				}

				// Case 2: Machine exist but no data array
				if (!prev.data) {
					console.log("📦 No data array - creating with new machine");
					return {
						...prev,
						data: [newMachine],
					};
				}

				// Case 3: Check if sensor already exists (prevent duplicates)
				const machineExists = prev?.data?.some(
					(machine) => machine.machine_id === newMachine.machine_id,
				);

				if (machineExists) {
					console.log("⚠️ machine already exists, skipping");
					return prev;
				}

				//ADDING THE NEW SENSOR TO THE STATE
				return { ...prev, data: [...prev.data, newMachine] };
			});
		};

		//Handler of machine deletion
		const handleMachineDelete = (data: any) => {
			console.log("🔴 Machine deleted via WebSocket:", data);

			const deletedMachine = data.data.record;

			setMachines((prev) => {
				if (!prev || !prev.data) return prev;

				// Remove the deleted sensor
				return {
					...prev,
					data: prev.data.filter(
						(machine) => machine.machine_id !== deletedMachine.machine_id,
					),
				};
			});
		};

		//HANDLER OF MACHINE UPDATE
		const handleMachineUpdate = (data: any) => {
			console.log("🟡 WebSocket: MACHINE UPDATED", data);

			const updatedMachine: Machine = data.data.record;
			console.log("📊 Updated machine:", updatedMachine);

			setMachines((prev) => {
				// Case 1: No state yet → nothing to update
				if (!prev || !prev.data) {
					console.log("⚠️ No Machine loaded yet");
					return prev;
				}

				// Case 2: Demand does not exist → ignore
				const MachineExists = prev.data.some(
					(Machine) => Machine.machine_id === updatedMachine.machine_id,
				);

				if (!MachineExists) {
					console.log("⚠️ Machine not found, skipping update");
					return prev;
				}

				// Case 3: Replace the Machine
				return {
					...prev,
					data: prev.data.map((Machine) =>
						Machine.machine_id === updatedMachine.machine_id
							? { ...Machine, ...updatedMachine }
							: Machine,
					),
				};
			});
		};
		//Handler of the DEMAND update
		const handleDemandUpdate = (data: any) => {
			console.log("🟡 WebSocket: DEMAND UPDATED", data);

			const updatedDemand: Demand = data.data.record;
			console.log("📊 Updated demand:", updatedDemand);

			setDemands((prev) => {
				// Case 1: No state yet → nothing to update
				if (!prev || !prev.data) {
					console.log("⚠️ No demands loaded yet");
					return prev;
				}

				// Case 2: Demand does not exist → ignore
				const DemandExists = prev.data.some(
					(Demand) => Demand.demand_id === updatedDemand.demand_id,
				);

				if (!DemandExists) {
					console.log("⚠️ Demand not found, skipping update");
					return prev;
				}

				// Case 3: Replace the Demand
				return {
					...prev,
					data: prev.data.map((Demand) =>
						Demand.demand_id === updatedDemand.demand_id
							? { ...Demand, ...updatedDemand }
							: Demand,
					),
				};
			});
		};
		//Handler of Demand creation
		const handleDemandCreate = (data: any) => {
			console.log("🟢 WebSocket: NEW Demand DETECTED", data);

			// Get the new user from the message
			const newDemand: Demand = data.data.record;
			console.log("📊 New user:", newDemand);

			// UPDATE THE USERS STATE
			setDemands((prev) => {
				//console.log('🔄 Updating state... Previous state:', prev?.data?.length || 0, 'sensors');

				// Case 1: No user loaded yet
				if (!prev) {
					console.log("📦 First Demand - creating initial state");
					return {
						status: 200,
						message: "users",
						data: [newDemand],
					};
				}

				// Case 2: users exist but no data array
				if (!prev.data) {
					console.log("📦 No data array - creating with new Demand");
					return {
						...prev,
						data: [newDemand],
					};
				}

				// Case 3: Check if Demand already exists (prevent duplicates)
				const DemandExists = prev?.data?.some(
					(Demand) => Demand.demand_id === newDemand.demand_id,
				);

				if (DemandExists) {
					console.log("⚠️ Demand already exists, skipping");
					return prev;
				}

				//ADDING THE NEW user TO THE STATE
				return { ...prev, data: [...prev.data, newDemand] };
			});
		};
		//Handler of Demand deletion
		const handleDemandDelete = (data: any) => {
			console.log("🔴 Demand deleted via WebSocket:", data);

			const deletedDemand = data.data.record;

			setDemands((prev) => {
				if (!prev || !prev.data) return prev;

				// Remove the deleted sensor
				return {
					...prev,
					data: prev.data.filter(
						(Demand) => Demand.demand_id !== deletedDemand.demand_id,
					),
				};
			});
		};
		//Handler of reading from n8n
		const handlen8nMessage = (data: any) => {
			setai_response(data.data.message);
		};

		// ⭐⭐⭐ LISTEN  FOR SENSOR CREATION / DELETION MESSAGES ⭐⭐⭐
		webSocketClient.on("TABLE_SENSOR_CREATE", handleSensorCreate);
		webSocketClient.on("TABLE_SENSOR_DELETE", handleSensorDelete);
		webSocketClient.on("TABLE_TASK_CREATE", handleTaskCreate);
		webSocketClient.on("TABLE_TASK_DELETE", handleTaskDelete);
		webSocketClient.on("TABLE_TASK_UPDATE", handleTaskUpdate);
		webSocketClient.on("TABLE_USERS_CREATE", handleUserCreate);
		webSocketClient.on("TABLE_USERS_DELETE", handleUserDelete);
		webSocketClient.on("TABLE_MACHINE_CREATE", handleMachineCreate);
		webSocketClient.on("TABLE_MACHINE_DELETE", handleMachineDelete);
		webSocketClient.on("TABLE_MACHINE_UPDATE", handleMachineUpdate);
		webSocketClient.on("TABLE_DEMAND_DELETE", handleDemandDelete);
		webSocketClient.on("TABLE_DEMAND_CREATE", handleDemandCreate);
		webSocketClient.on("TABLE_DEMAND_UPDATE", handleDemandUpdate);
		webSocketClient.on("n8nRead", handlen8nMessage);
	}, []);
=======

>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
				//response.data?.map((s) => { console.log(s) });
=======
				//console.log(`response is ${response}`);
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
				//console.log(`demands are  ${response.data}`);
=======
				console.log(`demands are  ${response.data}`);
>>>>>>> 6d15baa (adding all previous work)
				setDemands(response);
			} catch (err) {
				console.log(`error is ${err}`);
			}
		};
		fetchDemands();
	}, []);
<<<<<<< HEAD
	/**fetching Tasks */
=======

>>>>>>> 6d15baa (adding all previous work)
	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await new TaskAPI_Service().selectAll();
<<<<<<< HEAD
				//console.log(`response is ${response}`);
=======
				console.log(`response is ${response}`);
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
							<AI_responseContext.Provider value={ai_response}>
								{children}
							</AI_responseContext.Provider>
=======
							{children}
>>>>>>> 6d15baa (adding all previous work)
						</TaskContext.Provider>
					</DemandContext.Provider>
				</MachinesContext.Provider>
			</UsersContext.Provider>
		</SensorsContext.Provider>
	);
};

export default DataProvider;
