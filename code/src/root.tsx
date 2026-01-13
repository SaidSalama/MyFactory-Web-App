"use client";

import "./index.css"; // css import is automatically injected in exported server components
import { Factory, Users, Wrench } from "lucide-react";
import { createContext, useEffect, useState } from "react";
import type { Machine } from "../models/machine";
import DashboardHeader from "./Components/DashBoardHeader/DashBoardHeader";
import LoginPage from "./Components/LoginPage/LoginPage";
import UserSpace from "./Components/UserSpaces/UserSpace";
import DataProvider from "./DataProvider";
import type { ApiResponse } from "./models/api_response";
import MachineAPI_Service from "./Services/machine_api_service";

export function Root({ url }: { url: URL }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<link rel="icon" type="image/svg+xml" href="/vite.svg" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Vite + RSC</title>
			</head>
			<body>
				<App url={url.href} />
			</body>
		</html>
	);
}

type AppProps = {
	url: string;
};

export const machinesContext = createContext<ApiResponse<Machine[]> | null>(
	null,
); //create a context to store the machines to be used by all components

function App() {
	/*Roles in the factory */
	const Roles = [
		{
			type: "Engineer",
			title: "Engineer",
			description: "Visualize data, send tasks, receive demands",
			icon: Factory,
		},
		{
			type: "Technician",
			title: "Technician",
			description: "View tasks, add comments, update status",
			icon: Wrench,
		},
		{
			type: "Director",
			title: "Director",
			description: "Manage users, stock, and send demands",
			icon: Users,
		},
	];
	/* ***************************************************/
	const [user, setUser] = useState(null); // null = not logged in
	/* this is the part of message sent to technician in task */

	// This function will be called by LoginPage when login succeeds
	const handleLogin = (userData) => {
		setUser(userData); // Save the logged-in user
		console.log("Logged in as:", userData);
	};

	// Optional: Logout function
	const handleLogout = () => {
		setUser(null);
	};

	const filterData = (data, searchFields) => {
		if (!searchQuery) return data;
		return data.filter((item) =>
			searchFields.some((field) =>
				item[field]
					?.toString()
					.toLowerCase()
					.includes(searchQuery.toLowerCase()),
			),
		);
	};
	const [searchQuery, setSearchQuery] = useState("");
	return (
		<div>
			{user ? (
				// ← USER IS LOGGED IN → Show dashboard or main app
				<div>
					{/*<Dashboard user={user} onLogout={handleLogout} >*/}
					<DashboardHeader
						user={user}
						onLogout={handleLogout}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
					{/*provide the feteched data to the whole userspace */}
					<DataProvider>
						<UserSpace filterData={filterData} user={user} />
					</DataProvider>
				</div>
			) : (
				// ← USER NOT LOGGED IN → Show login page

				<LoginPage onLogin={handleLogin} Roles={Roles} />
			)}
		</div>
	);
}
