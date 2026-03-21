import { CheckCheck, Eye, MessageSquarePlus, Play, Send } from "lucide-react";
import React, { useContext, useState } from "react";
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
import "./TaskTab_tech.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Comment } from "../../../models/comment";
import type { Task } from "../../../models/task";
import { TaskContext } from "../../DataProvider";
import { LoginUserContext } from "../../root";
import CommentAPI_Service from "../../Services/comment_api_srevice";
import TaskAPI_Service from "../../Services/task_api_service";

const TaskTab_tech = ({ filterData }) => {
	const user = localStorage.getItem("loggedInUser");
	const LoginUser = JSON.parse(user as string);
	const Tasks = useContext(TaskContext);
	const [isopen, setIsopen] = useState(false);
	const [viewcomment, setViewcomment] = useState(false);
	const [addcomment, setAddcomment] = useState(false);
	const [starttask, setStarttask] = useState(false);
	const [completetask, setCompleteTask] = useState(false);
	const [SelectedTask, setSelectedTask] = useState<Partial<Task>>({});
	const [formError, setFormError] = useState<string | null>(null);
	const [NewComment, setNewComment] = useState<Partial<Comment>>({});

	//status of the task after any update
	const In_Process = 2;
	const Done = 3;

	const HandleClose = () => {
		setIsopen(false);
		setViewcomment(false);
		setAddcomment(false);
		setSelectedTask({});
		setCompleteTask(false);
		setStarttask(false);
		setFormError(null);
		setNewComment({});
	};
	const Handleopen = () => {
		setIsopen(true);
	};

	const updateTask = async (newstate: Partial<Task>) => {
		try {
			const response = await new TaskAPI_Service().update(newstate);
			console.log(`updated task is ${newstate.status_id}`);
		} catch (err) {
			console.log(`error of update is ${err}`);
		}
	};

	const createcomment = async () => {
		try {
			const response = await new CommentAPI_Service().create(NewComment);
		} catch (err) {
			console.log(`error of creation is ${err}`);
		}
	};
	const validateComment = () => {
		if (NewComment.value === "" || NewComment.value === undefined) {
			setFormError("Comment must not be empty");
			return false;
		}
		setFormError(null); //there is  no error
		return true;
	};
	const HandleCreateComment = () => {
		if (!validateComment()) return;
		createcomment();
		HandleClose();
	};

	return (
		<>
			<Card>
				<CardHeader className="task-card-header">
					<div>
						<CardTitle className="Card_Title">Tasks</CardTitle>
						<CardDescription className="task-header-description">
							Manage tasks
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent>
					<div className="task-list">
						{Tasks?.data?.map((task) => (
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
										<p>Machines:</p>
										{task.machines.map((m) => (
											<p key={m.machine_id}>{m.name}</p>
										))}
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
								<div className="actions">
									<button
										className="actionBtn"
										type="button"
										onClick={() => {
											setSelectedTask(task);
											setViewcomment(true);
											Handleopen();
										}}
									>
										View Description
										<Eye className="view-icon" />
									</button>
									{/* only shows these action button when connected technician is the assignee*/}
									{task.assignee.user_id === LoginUser?.user_id && (
										<>
											<button
												className="actionBtn"
												type="button"
												onClick={() => {
													//setSelectedTask(task);
													setNewComment({
														...NewComment,
														task_id: task.task_id,
													});
													setAddcomment(true);
													Handleopen();
												}}
											>
												Add Comment
												<MessageSquarePlus className="comment-icon" />
											</button>
											{/* only shows this button when task s are In Process*/}
											{task.status.value === "In Process" && (
												<button
													className="actionBtn"
													type="button"
													onClick={() => {
														setSelectedTask(task);
														setCompleteTask(true);
														Handleopen();
													}}
												>
													Mark as Done
													<CheckCheck className="complete-icon" />
												</button>
											)}

											{/* only shows this button when task s are pending*/}
											{task.status.value === "Pending" ? (
												<button
													className="actionBtn"
													type="button"
													onClick={() => {
														setSelectedTask(task);
														setStarttask(true);
														Handleopen();
													}}
												>
													Start Task
													<Play className="start-icon" />
												</button>
											) : null}
										</>
									)}
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
			<Modal isOpen={isopen} onClose={HandleClose}>
				{SelectedTask && viewcomment && (
					<>
						<h2 className="modal-title">Description of the task</h2>
						<p>{SelectedTask.description}</p>
					</>
				)}
				{SelectedTask && addcomment && (
					<>
						<h3 className="modal-title">Add comment on the task:</h3>

						{formError && <p style={{ color: "red" }}>{formError} *</p>}
						<div className="form-group">
							<label className="form-label">Comment</label>
							<textarea
								rows={4}
								className="form-input"
								placeholder="Enter your comment"
								value={NewComment.value}
								onChange={(e) => {
									setNewComment({ ...NewComment, value: e.target.value });
								}}
							/>
							<button
								onClick={() => {
									/*send to back */

									HandleCreateComment();
								}}
								className="modal-submit-button"
								type="button"
							>
								Add Comment
							</button>
						</div>
					</>
				)}
				{SelectedTask && starttask && (
					<>
						<h3 className="modal-title">Confirm that you start the task</h3>
						<button
							className="actionBtn"
							type="button"
							onClick={() => {
								updateTask({
									task_id: SelectedTask.task_id,
									status_id: In_Process,
								});
								HandleClose();
							}}
						>
							Start
							<Play className="start-icon" />
						</button>
					</>
				)}
				{SelectedTask && completetask && (
					<>
						<h3 className="modal-title">Confirm that you the task is done</h3>
						<button
							className="actionBtn"
							type="button"
							onClick={() => {
								updateTask({
									task_id: SelectedTask.task_id,
									status_id: Done,
								});
								HandleClose();
							}}
						>
							Mark as Done
							<CheckCheck className="complete-icon" />
						</button>
					</>
				)}
			</Modal>
		</>
	);
};

export default TaskTab_tech;
