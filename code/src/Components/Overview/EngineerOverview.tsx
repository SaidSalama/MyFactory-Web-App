import { Card, CardContent, CardHeader, CardTitle } from "../Card/Card";
import StatNumber from "../StatNumber/StatNumber";
import "./Overview.css"; // shared CSS
import { useContext } from "react";
import type { Demand } from "../../../models/demand";
import type { Machine } from "../../../models/machine";
import type { Task } from "../../../models/task";
import {
	DemandContext,
	MachinesContext,
	TaskContext,
} from "../../DataProvider";

const EngineerOverview = () => {
	const Machines = useContext(MachinesContext)?.data as Machine[];
	const Demands = useContext(DemandContext)?.data as Demand[];
	const Tasks = useContext(TaskContext)?.data as Task[];

	function summarizeMachines(machines: Machine[]) {
		return {
			total: machines?.length,
			running: machines?.filter((m) => m.status.value === "Running").length,
			stopped: machines?.filter((m) => m.status.value === "Stopped").length,
			blocked: machines?.filter((m) => m.status.value === "Blocked").length,
		};
	}
	function summarizeDemands(demands: Demand[]) {
		return {
			total: demands?.length,
			pending: demands?.filter((d) => d.status.value === "Pending").length,
			completed: demands?.filter((d) => d.status.value === "Completed").length,
		};
	}

	function summarizeTasks(tasks: Task[]) {
		return {
			total: tasks?.length,
			In_Process: tasks?.filter((t) => t.status.value === "In Process").length,
			Done: tasks?.filter((t) => t.status.value === "Done").length,
			Urgent: tasks?.filter((t) => t.priority.value === "High").length,
		};
	}
	const machines = summarizeMachines(Machines);
	const demands = summarizeDemands(Demands);
	const tasks = summarizeTasks(Tasks);
	return (
		<div className="overview-grid">
			{/* Machines Summary */}

			<Card className="overview-card">
				<CardHeader>
					<CardTitle className="overview_title">Machines</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="stat-row">
						<span className="stat-label">Running</span>
						<StatNumber
							value={machines.running || 0}
							variant="success"
							size="sm"
						/>
					</div>
					<div className="stat-row">
						<span className="stat-label">Stopped</span>
						<StatNumber
							value={machines.stopped || 0}
							variant="warning"
							size="sm"
						/>
					</div>
					<div className="stat-row">
						<span className="stat-label">Blocked</span>
						<StatNumber
							value={machines.blocked || 0}
							variant="danger"
							size="sm"
						/>
					</div>
					<div className="stat-row">
						<span className="stat-label">Total</span>
						<span className="stat-big">{machines.total || 0}</span>
					</div>
				</CardContent>
			</Card>

			{/* Demands Summary */}
			<Card className="overview-card">
				<CardHeader>
					<CardTitle className="overview_title">Demands</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="stat-row">
						<span className="stat-label">Pending</span>
						<StatNumber
							value={demands.pending || 0}
							variant="warning"
							size="sm"
						/>
					</div>
					<div className="stat-row">
						<span className="stat-label">Completed not approved</span>
						<StatNumber
							value={demands.completed || 0}
							variant="success"
							size="sm"
						/>
					</div>
					<div className="stat-row">
						<span className="stat-label">Total</span>
						<span className="stat-big">{demands.total || 0}</span>
					</div>
				</CardContent>
			</Card>

			{/* Tasks Summary */}
			{
				<Card className="overview-card">
					<CardHeader>
						<CardTitle className="overview_title">Tasks</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="stat-row">
							<span className="stat-label">High Priority</span>
							<StatNumber
								value={tasks.Urgent || 0}
								variant="danger"
								size="sm"
							/>
						</div>
						<div className="stat-row">
							<span className="stat-label">In Process</span>
							<StatNumber
								value={tasks.In_Process || 0}
								variant="warning"
								size="sm"
							/>
						</div>
						<div className="stat-row">
							<span className="stat-label">Done</span>
							<StatNumber value={tasks.Done || 0} variant="success" size="sm" />
						</div>
						<div className="stat-row">
							<span className="stat-label">Total</span>
							<span className="stat-big">{tasks.total || 0}</span>
						</div>
					</CardContent>
				</Card>
			}
		</div>
	);
};

export default EngineerOverview;
