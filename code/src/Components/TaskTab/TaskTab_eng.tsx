import { Send } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import type { Task } from "../../../models/task";
import Badge from "../Badge/Badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../Card/Card";
import Modal from "../Modal/Modal";
import Select, { SelectItem } from "../Select/Select";
import "./TaskTab_eng.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
<<<<<<< HEAD
import type { Machine } from "../../../models/machine";
import { MachinesContext, TaskContext, UsersContext } from "../../DataProvider";
import type { ApiResponse } from "../../models/api_response";
import { LoginUserContext } from "../../root";
import MachineAPI_Service from "../../Services/machine_api_service";
import TaskAPI_Service from "../../Services/task_api_service";
import MultiSelect from "../Select/MultiSelect";
import MultiSelectForMachines from "../Select/MultiSelectForMachines";

const TaskTab = ({ filterData }) => {
	const Tasks = useContext(TaskContext);
	const Users = useContext(UsersContext);
	const Machines = useContext(MachinesContext);
	const user = localStorage.getItem("loggedInUser");
	const LoginUser = JSON.parse(user as string);

=======
import { MachinesContext, TaskContext, UsersContext } from "../../DataProvider";
import type { ApiResponse } from "../../models/api_response";
import TaskAPI_Service from "../../Services/task_api_service";

const TaskTab = ({ filterData }) => {
>>>>>>> 6d15baa (adding all previous work)
	const [SelectedTask, setSelectedTask] = useState<Partial<Task>>({});
	const [FormError, setFormError] = useState<string | null>(null);
	const [del, setDel] = useState(false);
	const [NewTask, setNewTask] = useState<Partial<Task>>({
		//default value
<<<<<<< HEAD
		created_by: LoginUser?.user_id,
		description: "",
		priority_id: 0,
		deadline: "",
		status_id: 1,
		assigned_to: 0,
=======
		created_by: 1,
		description: "",
		priority_id: 1,
		deadline: "",
		status_id: 1,
		assigned_to: 2,
>>>>>>> 6d15baa (adding all previous work)
		title: "",
		machine_ids: "",
	});

<<<<<<< HEAD
=======
	const Tasks = useContext(TaskContext);
	const Users = useContext(UsersContext);
	const Machines = useContext(MachinesContext);

>>>>>>> 6d15baa (adding all previous work)
	const [isopen, setIsopen] = useState(false);
	const [ViewDescription, setViewDescription] = useState(false);
	const [ViewComments, setViewComments] = useState(false);
	const [CreateTask, setCreateTask] = useState(false);

<<<<<<< HEAD
	// empty task used to reset the new task state after creating it to avoid this error
	// :A component is changing an uncontrolled input to be controlled
	//because we can't control an undefined field in forms so we need an initial value
	const emptyTask: Partial<Task> = {
		created_by: LoginUser?.user_id,
		description: "",
		priority_id: 0,
		deadline: "",
		status_id: 1,
		assigned_to: 0,
		title: "",
		machine_ids: "",
	};
	if (!Tasks?.data) return <p>Loading</p>;
=======
	if (!Tasks?.data) return <p>Loading</p>;
	//console.log(Tasks?.data);
>>>>>>> 6d15baa (adding all previous work)

	const HandleClose = () => {
		setIsopen(false);
		setViewDescription(false);
		setCreateTask(false);
<<<<<<< HEAD
		setNewTask(emptyTask);
=======
		setNewTask({});
>>>>>>> 6d15baa (adding all previous work)
		setFormError(null);
		setSelectedTask({});
		setDel(false);
		setViewComments(false);
	};
	const Handleopen = () => {
		setIsopen(true);
	};

	const createTask = async () => {
		try {
			const response = await new TaskAPI_Service().create(NewTask);
			console.log(`created task is ${response.data}`);
<<<<<<< HEAD
			if (response.status === 401 || response.status === 403) {
				setFormError(response.message);
				return false;
			}
			return true;
		} catch (err) {
			console.log(`error of create is ${err}`);
			setFormError("failed to create tasks");
			return false;
		}
	};
	const updateMachine = async (data: Partial<Machine>) => {
		try {
			const response = await new MachineAPI_Service().update_status(data);
			if (response.status === 400) {
				setFormError(response.message);
				return false;
			}
			return true;
		} catch (err) {
			console.log(`error of update machine is ${err}`);
			setFormError("failed to update machine status");
			return false;
=======
		} catch (err) {
			console.log(`error of create is ${err}`);
>>>>>>> 6d15baa (adding all previous work)
		}
	};
	const deleteTask = async () => {
		try {
			const response = await new TaskAPI_Service().delete(SelectedTask);
			console.log(`deleted task is ${response.data}`);
		} catch (err) {
			console.log(`error of create is ${err}`);
		}
	};

	const validateTask = () => {
		if (NewTask.title.length < 3) {
			setFormError("Task title must be at least  3 characters");
			return false;
		}
		if (NewTask.description.length < 3) {
			setFormError("Description must be at least  3 characters");
			return false;
		}
		if (NewTask.machine_ids === "") {
<<<<<<< HEAD
			setFormError("Tasks must be on  at least one machine");
=======
			setFormError("Tasks must be on  a machine");
>>>>>>> 6d15baa (adding all previous work)
			return false;
		}
		if (NewTask.deadline === "") {
			setFormError("Tasks must have a deadline");
			return false;
		}

		setFormError(null); //there is  no error
		return true;
	};

<<<<<<< HEAD
	const HandleCreateTask = async () => {
		if (!validateTask()) return;
		if (!(await createTask())) return;
		//for each machine id in the task make its status=6 which means blocked
		for (const machineId of NewTask.machine_ids as any) {
			if (!(await updateMachine({ machine_id: machineId, status_id: 6 })))
				return;
		}
		HandleClose();
	};

	const HandleDeleteTask = async () => {
		const deletedTask = await new TaskAPI_Service().selectOne(
			SelectedTask.task_id as number,
		);
		//get the machineids without ","
		const machineIds = (deletedTask.data?.machine_ids ?? "")
			.split(",")
			.map(Number);
		//loop over machineids to update the status of each machine
		for (const machineId of machineIds) {
			const ok = await updateMachine({ machine_id: machineId, status_id: 5 });
			if (!ok) return;
		}

		await deleteTask();
=======
	const HandleCreateTask = () => {
		if (!validateTask()) return;
		createTask();
		HandleClose();
	};

	const HandleDeleteTask = () => {
		deleteTask();
>>>>>>> 6d15baa (adding all previous work)
		HandleClose();
	};
	const toMySQLDateTime = (date: Date | null): string => {
		const pad = (n: number) => n.toString().padStart(2, "0");
		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
			date.getDate(),
		)} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
			date.getSeconds(),
		)}`;
	};
<<<<<<< HEAD
	//console.log(`from task tab connected user is ${LoginUser?.username}`);
=======
>>>>>>> 6d15baa (adding all previous work)
	return (
		<>
			<Card>
				<CardHeader className="task-card-header">
					<div>
<<<<<<< HEAD
						<CardTitle className="Card_Title">Tasks</CardTitle>
=======
						<CardTitle>Tasks</CardTitle>
>>>>>>> 6d15baa (adding all previous work)
						<CardDescription className="task-header-description">
							Manage technician tasks
						</CardDescription>
					</div>

					{/* Send Task Button */}
					<button
						type="button"
						onClick={() => {
							setCreateTask(true);
							Handleopen();
						}}
						className="task-send-button"
					>
						<Send className="send-icon" />
						Send Task
					</button>
				</CardHeader>

				<CardContent>
					<div className="task-list">
						{filterData(Tasks?.data, ["title"]).map((task: Task) => (
							<div key={task.task_id} className="task-item">
								<div className="task-header">
									<div className="task-info">
										<h3 className="task-title">{task.title || task.title}</h3>
										<p className="task-meta">
											Assigned to: {task.assignee.username}
										</p>
										<p className="task-meta">
											Created by: {task.creator.username}
										</p>
<<<<<<< HEAD
										<p>Machines:</p>
										{task.machines.map((m) => (
											<p key={m.machine_id}>{m.name}</p>
										))}
=======
>>>>>>> 6d15baa (adding all previous work)
									</div>
									<div className="task-badges">
										<Badge
											variant={
												task.priority.value === "high"
													? "destructive"
													: "default"
											}
										>
											{task.priority.value}
										</Badge>
										<Badge
											variant={
												task.status.value === "pending"
													? "warning"
													: "operational"
											}
										>
											{task.status.value}
										</Badge>
									</div>
								</div>
								<div className="task-actions">
									<button
										type="button"
										className="btn-outline-sm"
										onClick={() => {
											setSelectedTask(task);
											setViewDescription(true);
											Handleopen();
										}}
									>
										View Description
									</button>
<<<<<<< HEAD
									{/*only show the approve completion button when task finished and only to the creator of the task */}
									{task.status.value === "Done" &&
										task.creator.user_id === LoginUser?.user_id && (
											<button
												type="button"
												className="btn-outline-sm"
												onClick={() => {
													setSelectedTask(task);
													setDel(true);
													Handleopen();
												}}
											>
												Approve Completion
											</button>
										)}
=======
									{task.status.value === "Done" && (
										<button
											type="button"
											className="btn-outline-sm"
											onClick={() => {
												setSelectedTask(task);
												Handleopen();
												setDel(true);
											}}
										>
											Approve Completion
										</button>
									)}
>>>>>>> 6d15baa (adding all previous work)
									<button
										type="button"
										className="btn-outline-sm"
										onClick={() => {
											setSelectedTask(task);
<<<<<<< HEAD
											setViewComments(true);
											Handleopen();
=======
											Handleopen();
											setViewComments(true);
>>>>>>> 6d15baa (adding all previous work)
										}}
									>
										View Task Comments
									</button>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Modal isOpen={isopen} onClose={HandleClose}>
				{CreateTask && (
					<>
						<h2 className="modal-title">Send Task to Technician</h2>
						<p className="modal-description">Create a new task assignment</p>
						<div className="modal-form">
							{FormError && <p style={{ color: "red" }}>{FormError} *</p>}
							{/* Task Title */}
							<div className="form-group">
								<label className="form-label">Task Title</label>
								<input
									type="text"
									className="form-input"
									placeholder="Enter task title"
									value={NewTask.title}
									onChange={(e) =>
										setNewTask({ ...NewTask, title: e.target.value })
									}
								/>
							</div>

							{/* Description */}
							<div className="form-group">
								<label className="form-label">Description</label>
								<textarea
									rows="4"
									className="form-input"
									placeholder="Enter task description"
									value={NewTask.description}
									onChange={(e) =>
										setNewTask({ ...NewTask, description: e.target.value })
									}
								/>
							</div>
							{/*Machine on which task is executed */}
							<div className="form-group">
								<label className="form-label">
									Machine on which task is to be executed
								</label>
<<<<<<< HEAD
								<MultiSelect
									placeholder="Select Machines"
									value={NewTask.machine_ids}
									options={Machines?.data}
									onChange={(v) => {
										setNewTask({ ...NewTask, machine_ids: v });
									}}
								></MultiSelect>
=======
								<Select
									value={NewTask.machine_ids}
									onValueChange={(v: string) =>
										setNewTask({ ...NewTask, machine_ids: v })
									}
									placeholder="Select Machines"
								>
									{Machines?.data?.map((m) => (
										<SelectItem
											key={m.machine_id}
											value={m.machine_id.toString()} //because the machine_id is a number and we need it as a string
										>
											{m.name}
										</SelectItem>
									))}
								</Select>
>>>>>>> 6d15baa (adding all previous work)
							</div>
							{/* Assign to Technician */}
							<div className="form-group">
								<label className="form-label">Assign to Technician</label>
								<Select
									value={NewTask.assigned_to}
									onValueChange={(v: number) =>
										setNewTask({ ...NewTask, assigned_to: v })
									}
									placeholder="Select technician"
								>
									{Users?.data
										?.filter((u) => u.role_id === 2) //filter to get only technicians whose role_id=2
										.map((u) => (
											<SelectItem key={u.user_id} value={u.user_id}>
												{u.username}
											</SelectItem>
										))}
								</Select>
							</div>

							{/* Priority */}
							<div className="form-group">
								<label className="form-label">Priority</label>
								<Select
									value={NewTask.priority_id}
									onValueChange={(v: number) =>
										setNewTask({ ...NewTask, priority_id: v })
									}
									placeholder="Select priority"
								>
									<SelectItem value={1}>Low</SelectItem>
									<SelectItem value={2}>Medium</SelectItem>
									<SelectItem value={3}>High</SelectItem>
								</Select>
							</div>

							{/*DeadLine */}
							<div className="form-group">
								<label className="form-label">DeadLine</label>
								<DatePicker
									selected={
										NewTask.deadline ? new Date(NewTask.deadline) : null
									}
									onChange={(date) =>
										setNewTask({ ...NewTask, deadline: toMySQLDateTime(date) })
									}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={15}
									dateFormat="Pp"
									className="form-input"
								/>
							</div>

							{/* Submit Button */}
							<button
								onClick={HandleCreateTask}
								type="button"
								className="modal-submit-button"
							>
								Create Task
							</button>
						</div>
					</>
				)}
				{ViewDescription && (
					<>
						<h3 className="modal-title">Description of the task</h3>
						<h6>{SelectedTask.description}</h6>
					</>
				)}
				{del && (
					<>
						<h3 className="modal-title">
							Are you sure to approve the task done
						</h3>
						<button
							onClick={HandleDeleteTask}
							type="button"
							className="modal-submit-button"
						>
							Approve
						</button>
					</>
				)}
				{ViewComments && (
					<>
						<h3 className="modal-title">Comments on the Task</h3>
						{SelectedTask.comments?.map((comment) => (
							<div className="list-item" key={comment.comment_id}>
								{comment.value}
							</div>
						))}
					</>
				)}
			</Modal>
		</>
	);
};

export default TaskTab;
