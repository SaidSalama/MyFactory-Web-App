import React from "react";
import DemandTab_eng from "../DemandTab/DemandTab_eng";
import HMITab from "../HMITab/HMITab";
import MachineTab from "../MachineTab/MachineTab";
import TechnicianOverview from "../Overview/TechnicianOverview";
import SensorTab from "../SensorTab/SensorTab";
import Tabs, { TabsContent, TabsTrigger } from "../Tabs/Tabs";
import TaskTab_tech from "../TaskTab/TaskTab_tech";

const TechnicianSpace = ({ filterData }) => {
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
				<TabsTrigger value="HMI">HMI</TabsTrigger>

				<TabsContent value="overview">
					<TechnicianOverview />
				</TabsContent>

				<TabsContent value="machines">
					<MachineTab filterData={filterData} />
				</TabsContent>

				<TabsContent value="sensors">
					<SensorTab filterData={filterData} />
				</TabsContent>

				<TabsContent value="tasks">
					<TaskTab_tech filterData={filterData} />
				</TabsContent>

				<TabsContent value="HMI">
					<HMITab filterData={filterData} />
				</TabsContent>
			</Tabs>
		</main>
	);
};

export default TechnicianSpace;
