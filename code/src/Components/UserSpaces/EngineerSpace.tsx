import React from "react";
import DemandTab_eng from "../DemandTab/DemandTab_eng";
import HMITab from "../HMITab/HMITab";
import MachineTab from "../MachineTab/MachineTab";
import MachinesComponent from "../MachineTab/machine_test";
import SensorTab from "../SensorTab/SensorTab";
import Tabs, { TabsContent, TabsTrigger } from "../Tabs/Tabs";
import TaskTab_eng from "../TaskTab/TaskTab_eng";

const EngineerSpace = ({ filterData }) => {
	/*Machines test of HMI */
	const machines = [
		{
			id: "1",
			name: "CNC Machine A1",
			status: "operational",
			efficiency: 92,
			lastMaintenance: "2025-11-10",
		},
		{
			id: "2",
			name: "Assembly Line B2",
			status: "warning",
			efficiency: 78,
			lastMaintenance: "2025-11-05",
		},
		{
			id: "3",
			name: "Quality Control C3",
			status: "operational",
			efficiency: 95,
			lastMaintenance: "2025-11-12",
		},
		{
			id: "4",
			name: "Packaging Unit D4",
			status: "maintenance",
			efficiency: 0,
			lastMaintenance: "2025-11-13",
		},
	];

	return (
		<main
			className="container"
			style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
		>
			<Tabs defaultValue="overview">
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="machines">Machines</TabsTrigger>
				<TabsTrigger value="sensors">Sensors</TabsTrigger>
				<TabsTrigger value="tasks">Tasks</TabsTrigger>
				<TabsTrigger value="demands">Demands</TabsTrigger>
				<TabsTrigger value="HMI">HMI</TabsTrigger>

				<TabsContent value="overview"></TabsContent>

				<TabsContent value="machines">
					{/* <MachineTab filterData={filterData} /> */}
					<MachineTab filterData={filterData} />
				</TabsContent>

				<TabsContent value="sensors">
					<SensorTab filterData={filterData} />
				</TabsContent>

				<TabsContent value="tasks">
					<TaskTab_eng filterData={filterData} />
				</TabsContent>

				<TabsContent value="demands">
					<DemandTab_eng filterData={filterData} />
				</TabsContent>

				<TabsContent value="HMI">{<HMITab machines={machines} />}</TabsContent>
			</Tabs>
		</main>
	);
};

export default EngineerSpace;
