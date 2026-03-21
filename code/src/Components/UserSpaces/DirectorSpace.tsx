import React from "react";
import AdminTab from "../AdminTab/AdminTab";
import AIAssistantTab from "../AI_assistantTab/AIAssistantTab";
import DemandTab_dir from "../DemandTab/DemandTab_dir";
import HMITab from "../HMITab/HMITab";
import MachineTab from "../MachineTab/MachineTab";
import DirectorOverview from "../Overview/DirectorOverview";
import SensorTab from "../SensorTab/SensorTab";
import Tabs, { TabsContent, TabsTrigger } from "../Tabs/Tabs";
import TaskTab from "../TaskTab/TaskTab_eng"; //is used to test authorization

const DirectorSpace = ({ filterData }) => {
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
				<TabsTrigger value="admin">Admin</TabsTrigger>
				<TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>

				<TabsContent value="overview">
					<DirectorOverview />
				</TabsContent>

				<TabsContent value="machines">
					<MachineTab filterData={filterData} />
				</TabsContent>

				<TabsContent value="sensors">
					<SensorTab filterData={filterData} />
				</TabsContent>

				<TabsContent value="tasks">
					<TaskTab filterData={filterData} />
				</TabsContent>

				<TabsContent value="demands">
					<DemandTab_dir filterData={filterData} />
				</TabsContent>

				<TabsContent value="admin">
					<AdminTab />
				</TabsContent>

				<TabsContent value="ai-assistant">
					<AIAssistantTab />
				</TabsContent>
			</Tabs>
		</main>
	);
};

export default DirectorSpace;
