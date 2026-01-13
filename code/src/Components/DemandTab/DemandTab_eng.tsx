import React, { useContext, useEffect, useState } from "react";
import Badge from "../Badge/Badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../Card/Card";
import "./DemandTab_eng.css";
import type { Demand } from "../../../models/demand";
import { DemandContext } from "../../DataProvider";
import type { ApiResponse } from "../../models/api_response";
import DemandAPI_Service from "../../Services/demand_api_service";
import Modal from "../Modal/Modal";

const DemandTab_eng = ({ filterData }) => {
	const Demands = useContext(DemandContext);

	const [SelectedDemand, setSelectedDemand] = useState<Partial<Demand>>({});
	const [Markcompleted, setMarkcompleted] = useState(false);
	const [ViewDescription, setViewDescription] = useState(false);
	const [isopen, setIsopen] = useState(false);

	const HandleClose = () => {
		setIsopen(false);
		setSelectedDemand({});
		setMarkcompleted(false);
		setViewDescription(false);
	};
	const Handleopen = () => {
		setIsopen(true);
	};
	const CompleteDemand = async () => {
		try {
			const response = await new DemandAPI_Service().complete(SelectedDemand);
			console.log(`response is ${response.data}`);
		} catch (err) {
			console.log(`error of creation of user  is ${err}`);
		}
	};

	return (
		<Card>
			<CardHeader>
				<div>
					<CardTitle>Demands from Directors</CardTitle>
					<CardDescription>
						Review and respond to improvement requests
					</CardDescription>
				</div>
			</CardHeader>

			<CardContent>
				<div className="demands-list">
					{
						/*filterData(demands, ["title", "created_by"])*/ Demands?.data?.map(
							(demand) => (
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
												demand.status.value === "high"
													? "destructive"
													: "default"
											}
										>
											{demand.status.value === "Completed"
												? "Completed"
												: "Pending"}
										</Badge>
									</div>

									<div className="demand-actions">
										<button
											type="button"
											className="btn-outline-sm"
											onClick={() => {
												setViewDescription(true);
												setSelectedDemand(demand);
												Handleopen();
											}}
										>
											View Description
										</button>
										{demand.status.value !== "Completed" && (
											<button
												type="button"
												className="btn-primary-sm"
												onClick={() => {
													setMarkcompleted(true);
													setSelectedDemand(demand);
													Handleopen();
												}}
											>
												Mark as Completed
											</button>
											//button only for non completed demands
										)}
									</div>
								</div>
							),
						)
					}
				</div>
			</CardContent>
			<Modal isOpen={isopen} onClose={HandleClose}>
				{ViewDescription && (
					<>
						<h3 className="Details">Description of the demand</h3>
						<h6>{SelectedDemand.description}</h6>
					</>
				)}
				{Markcompleted && (
					<>
						<h3 className="Details">Confirm Completion</h3>
						<p>Are you sure that the demand is completed</p>
						<button
							type="button"
							className="btn-primary-sm"
							onClick={() => {
								CompleteDemand();
								HandleClose();
							}}
						>
							Confirm it is completed
						</button>
					</>
				)}
			</Modal>
		</Card>
	);
};

export default DemandTab_eng;
