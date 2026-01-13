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
import { MachinesContext, TaskContext, UsersContext } from "../../DataProvider";
import type { ApiResponse } from "../../models/api_response";
import TaskAPI_Service from "../../Services/task_api_service";

const TaskTab = ({ filterData }) => {
	const [SelectedTask, setSelectedTask] = useState<Partial<Task>>({});
	const [FormError, setFormError] = useState<string | null>(null);
	const [del, setDel] = useState(false);
	const [NewTask, setNewTask] = useState<Partial<Task>>({
		//default value
		created_by: 1,
		description: "",
		priority_id: 1,
		deadline: "",
		status_id: 1,
		assigned_to: 2,
		title: "",
		machine_ids: "",
	});

	const Tasks = useContext(TaskContext);
	const Users = useContext(UsersContext);
	const Machines = useContext(MachinesContext);

	const [isopen, setIsopen] = useState(false);
	const [ViewDescription, setViewDescription] = useState(false);
	const [ViewComments, setViewComments] = useState(false);
	const [CreateTask, setCreateTask] = useState(false);

	if (!Tasks?.data) return <p>Loading</p>;
	//console.log(Tasks?.data);

	const HandleClose = () => {
		setIsopen(false);
		setViewDescription(false);
		setCreateTask(false);
		setNewTask({});
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
		} catch (err) {
			console.log(`error of create is ${err}`);
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
			setFormError("Tasks must be on  a machine");
			return false;
		}
		if (NewTask.deadline === "") {
			setFormError("Tasks must have a deadline");
			return false;
		}

		setFormError(null); //there is  no error
		return true;
	};

	const HandleCreateTask = () => {
		if (!validateTask()) return;
		createTask();
		HandleClose();
	};

	const HandleDeleteTask = () => {
		deleteTask();
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
	return (
		<>
			<Card>
				<CardHeader className="task-card-header">
					<div>
						<CardTitle>Tasks</CardTitle>
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
									<button
										type="button"
										className="btn-outline-sm"
										onClick={() => {
											setSelectedTask(task);
											Handleopen();
											setViewComments(true);
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
