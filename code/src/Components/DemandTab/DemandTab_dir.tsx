import { Send } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Badge from "../Badge/Badge";
import "react-datepicker/dist/react-datepicker.css";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../Card/Card";
import "./DemandTab_dir.css";

import type { Demand } from "../../../models/demand";
import { DemandContext } from "../../DataProvider";
import DemandAPI_Service from "../../Services/demand_api_service";
import Modal from "../Modal/Modal";

const DemandTab_dir = ({ filterData }) => {
	const Demands = useContext(DemandContext);
	const [isopen, setIsopen] = useState(false);
	const [CreateDemand, setCreateDemand] = useState(false);
	const [ViewDescription, setViewDescription] = useState(false);
	const [DeleteDemand, setDeleteDemand] = useState(false);
	const [formError, setFormError] = useState<string | null>(null); //state storing errors of the forms
	const [SelectedDemand, setSelectedDemand] = useState<Partial<Demand>>({});
	const [NewDemand, setNewDemand] = useState<
		Omit<
			Demand,
			"demand_id" | "created_by" | "status_id" | "creator" | "status"
		>
	>({
		title: "",
		description: "",
		deadline: "",
	});

	if (!Demands?.data) return <p>Loading</p>;
	const HandleClose = () => {
		setIsopen(false);
		setCreateDemand(false);
		setViewDescription(false);
		setDeleteDemand(false);
		setFormError(null);
	};
	const Handleopen = () => {
		setIsopen(true);
	};
	//const [Selected_demand, setSelected_demand] = useState("");

	const HandleCreateDemand = () => {
		if (!validateDemand()) return; //if there is an error don't send to backend
		createDemand();
		console.log(NewDemand);
		setCreateDemand(false);
		setIsopen(false);
	};

	const deleteDemand = async () => {
		try {
			const response = await new DemandAPI_Service().delete(SelectedDemand);
			console.log(`deleted user is ${response.data}`);
		} catch (err) {
			console.log(`error of delete is ${err}`);
		}
	};
	const createDemand = async () => {
		try {
			const response = await new DemandAPI_Service().create(NewDemand);
			console.log(`created demand is ${response.data}`);
		} catch (err) {
			console.log(`error of delete is ${err}`);
		}
	};

	const validateDemand = () => {
		if (NewDemand.title.length < 3) {
			setFormError("Demand title must be at least  3 characters");
			return false;
		}
		if (NewDemand.description.length < 3) {
			setFormError("Description must be at least  3 characters");
			return false;
		}
		if (NewDemand.deadline === "") {
			setFormError("Demands must have a deadline");
			return false;
		}

		setFormError(null); //there is  no error
		return true;
	};
	//the convertion function
	//we need it because mysql only accepts string for the DateTime variables
	// so we need to convete the javascript date object to string that can be accepted by mysql
	const toMySQLDateTime = (date: Date | null): string => {
		const pad = (n: number) => n.toString().padStart(2, "0");
		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
			date.getDate(),
		)} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
			date.getSeconds(),
		)}`;
	};

	return (
		<Card>
			<CardHeader className="demandHeader">
				<div>
					<CardTitle>Demands from Business Owner</CardTitle>
					<CardDescription>
						You can create any demand to engineers
					</CardDescription>
				</div>
				<button
					type="button"
					onClick={() => {
						Handleopen();
						setCreateDemand(true);
					}}
					className="task-send-button"
				>
					<Send className="send-icon" />
					Send Demand
				</button>
			</CardHeader>

			<CardContent>
				<div className="demands-list">
					{Demands?.data?.map((demand) => (
						<div key={demand.demand_id} className="demand-item">
							<div className="demand-header">
								<div className="demand-info">
									<p className="demand-message">{demand.title}</p>
									<p className="demand-meta">
										From: <strong>{demand.creator.username}</strong> •{" "}
										{demand.deadline?.toString()}
									</p>
								</div>

								<Badge
									variant={
										demand.status.value === "high" ? "destructive" : "default"
									}
								>
									{demand.status.value === "Completed"
										? "Completed"
										: "Pending"}
								</Badge>
							</div>

							<div className="demand-actions">
								{/* <button
									type="button"
									className="btn-outline-sm"
									onClick={() => {
										Handleopen();
										setSelected_demand(demand);
									}}
								>
									View Description
								</button> */}
								<button
									type="button"
									className="btn-primary-sm"
									onClick={() => {
										setSelectedDemand(demand);
										setViewDescription(true);
										Handleopen();
									}}
								>
									View Description
								</button>
								{demand.status.value === "Completed" ? (
									<button
										type="button"
										className="btn-primary-sm"
										onClick={() => {
											setSelectedDemand(demand);
											setDeleteDemand(true);
											Handleopen();
										}}
									>
										Approve Completion
									</button>
								) : null}
							</div>
						</div>
					))}
				</div>
			</CardContent>
			<Modal isOpen={isopen} onClose={HandleClose}>
				{CreateDemand && (
					<>
						<h3 className="Details">Create a new Demand </h3>
						<div>
							{formError && <p style={{ color: "red" }}>{formError} *</p>}
							<div className="form-group">
								<label className="form-label">Demand Title</label>
								<input
									type="text"
									className="form-input"
									placeholder="Enter task title"
									value={NewDemand.title}
									onChange={(e) =>
										setNewDemand({ ...NewDemand, title: e.target.value })
									}
								/>
							</div>
							<div className="form-group">
								<label className="form-label">Description</label>
								<textarea
									rows="4"
									className="form-input"
									placeholder="Enter Demand description"
									value={NewDemand.description}
									onChange={(e) =>
										setNewDemand({ ...NewDemand, description: e.target.value })
									}
								/>
							</div>
							<div className="form-group">
								<label className="form-label">DeadLine</label>
								<DatePicker
									selected={
										NewDemand.deadline ? new Date(NewDemand.deadline) : null
									}
									onChange={(date) =>
										setNewDemand({
											...NewDemand,
											deadline: toMySQLDateTime(date),
										})
									}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={15}
									dateFormat="Pp"
									className="form-input"
								/>
							</div>
							<button
								onClick={HandleCreateDemand}
								className="modal-submit-button"
								type="button"
							>
								Create Demand
							</button>
						</div>
					</>
				)}
				{ViewDescription && (
					<>
						<h3 className="Details">Description of the demand</h3>
						<h6>{SelectedDemand.description}</h6>
					</>
				)}
				{DeleteDemand && (
					<>
						<h3 className="Details">Are you sure to approve this demand</h3>
						<button
							onClick={() => {
								deleteDemand();
								HandleClose();
							}}
							className="modal-submit-button"
							type="button"
						>
							Approve Demand
						</button>
					</>
				)}
			</Modal>
		</Card>
	);
};

export default DemandTab_dir;
