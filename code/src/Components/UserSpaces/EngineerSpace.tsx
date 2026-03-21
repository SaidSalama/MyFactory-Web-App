import React from "react";
import AIAssistantTab from "../AI_assistantTab/AIAssistantTab";
import DemandTab_eng from "../DemandTab/DemandTab_eng";
import HMITab from "../HMITab/HMITab";
import MachineTab from "../MachineTab/MachineTab";
import MachinesComponent from "../MachineTab/machine_test";
import EngineerOverview from "../Overview/EngineerOverview";
import SensorTab from "../SensorTab/SensorTab";
import Tabs, { TabsContent, TabsTrigger } from "../Tabs/Tabs";
import TaskTab_eng from "../TaskTab/TaskTab_eng";

const EngineerSpace = ({ filterData }) => {
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
				<TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>

				<TabsContent value="overview">
					<EngineerOverview />
				</TabsContent>

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

				<TabsContent value="HMI">
					<HMITab filterData={filterData} />
				</TabsContent>

				<TabsContent value="ai-assistant">
					<AIAssistantTab />
				</TabsContent>
			</Tabs>
		</main>
	);
};

export default EngineerSpace;
