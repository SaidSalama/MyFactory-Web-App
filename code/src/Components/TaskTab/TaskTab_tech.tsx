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
<<<<<<< HEAD
import { LoginUserContext } from "../../root";
=======
>>>>>>> 6d15baa (adding all previous work)
import CommentAPI_Service from "../../Services/comment_api_srevice";
import TaskAPI_Service from "../../Services/task_api_service";

const TaskTab_tech = ({ filterData }) => {
<<<<<<< HEAD
	const user = localStorage.getItem("loggedInUser");
	const LoginUser = JSON.parse(user as string);
=======
>>>>>>> 6d15baa (adding all previous work)
	const Tasks = useContext(TaskContext);
	const [isopen, setIsopen] = useState(false);
	const [viewcomment, setViewcomment] = useState(false);
	const [addcomment, setAddcomment] = useState(false);
	const [starttask, setStarttask] = useState(false);
	const [completetask, setCompleteTask] = useState(false);
	const [SelectedTask, setSelectedTask] = useState<Partial<Task>>({});
	const [formError, setFormError] = useState<string | null>(null);
<<<<<<< HEAD
	const [NewComment, setNewComment] = useState<Partial<Comment>>({});
=======
	const [NewComment, setNewComment] = useState<Partial<Comment>>({
		task_id: 2,
		value: "",
	});
>>>>>>> 6d15baa (adding all previous work)

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
<<<<<<< HEAD
		setNewComment({});
=======
>>>>>>> 6d15baa (adding all previous work)
	};
	const Handleopen = () => {
		setIsopen(true);
	};

	const updateTask = async (newstate: Partial<Task>) => {
		try {
			const response = await new TaskAPI_Service().update(newstate);
<<<<<<< HEAD
			console.log(`updated task is ${newstate.status_id}`);
=======
			console.log(`updated task is ${response.data}`);
>>>>>>> 6d15baa (adding all previous work)
		} catch (err) {
			console.log(`error of update is ${err}`);
		}
	};

	const createcomment = async () => {
		try {
			const response = await new CommentAPI_Service().create(NewComment);
<<<<<<< HEAD
=======
			console.log(`created comment is ${response.data}`);
>>>>>>> 6d15baa (adding all previous work)
		} catch (err) {
			console.log(`error of creation is ${err}`);
		}
	};
	const validateComment = () => {
<<<<<<< HEAD
		if (NewComment.value === "" || NewComment.value === undefined) {
=======
		if (NewComment?.value === "") {
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD

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
								<div className="actions">
									<button
										className="actionBtn"
										type="button"
										onClick={() => {
<<<<<<< HEAD
											setSelectedTask(task);
											setViewcomment(true);
											Handleopen();
=======
											Handleopen();
											setSelectedTask(task);
											setViewcomment(true);
>>>>>>> 6d15baa (adding all previous work)
										}}
									>
										View Description
										<Eye className="view-icon" />
									</button>
<<<<<<< HEAD
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
=======
									<button
										className="actionBtn"
										type="button"
										onClick={() => {
											Handleopen();
											setSelectedTask(task);
											setAddcomment(true);
										}}
									>
										Add Comment
										<MessageSquarePlus className="comment-icon" />
									</button>
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
>>>>>>> 6d15baa (adding all previous work)
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
			<Modal isOpen={isopen} onClose={HandleClose}>
				{SelectedTask && viewcomment && (
					<>
<<<<<<< HEAD
						<h2 className="modal-title">Description of the task</h2>
=======
						<h2>Description of the task</h2>
>>>>>>> 6d15baa (adding all previous work)
						<p>{SelectedTask.description}</p>
					</>
				)}
				{SelectedTask && addcomment && (
					<>
<<<<<<< HEAD
						<h3 className="modal-title">Add comment on the task:</h3>

=======
						<h3>Add comment on the task</h3>
>>>>>>> 6d15baa (adding all previous work)
						{formError && <p style={{ color: "red" }}>{formError} *</p>}
						<div className="form-group">
							<label className="form-label">Comment</label>
							<textarea
								rows={4}
								className="form-input"
								placeholder="Enter your comment"
<<<<<<< HEAD
								value={NewComment.value}
=======
								value={NewComment?.value}
>>>>>>> 6d15baa (adding all previous work)
								onChange={(e) => {
									setNewComment({ ...NewComment, value: e.target.value });
								}}
							/>
							<button
								onClick={() => {
									/*send to back */
<<<<<<< HEAD

									HandleCreateComment();
=======
									setNewComment({
										...NewComment,
										task_id: SelectedTask.task_id,
									}); //so the comment is added to task on which the user clicked add comment
									HandleCreateComment();
									//HandleClose();
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
						<h3 className="modal-title">Confirm that you start the task</h3>
=======
						<h3>Confirm that you start the task</h3>
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
						<h3 className="modal-title">Confirm that you the task is done</h3>
=======
						<h3>Confirm that you the task is done</h3>
>>>>>>> 6d15baa (adding all previous work)
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
