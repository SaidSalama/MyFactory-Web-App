"use client";

import "./index.css"; // css import is automatically injected in exported server components
import { Factory, Users, Wrench } from "lucide-react";
import { createContext, useEffect, useState } from "react";
import type { Machine } from "../models/machine";
<<<<<<< HEAD
import type { Users as UserType } from "../models/users";
=======
>>>>>>> 6d15baa (adding all previous work)
import DashboardHeader from "./Components/DashBoardHeader/DashBoardHeader";
import LoginPage from "./Components/LoginPage/LoginPage";
import UserSpace from "./Components/UserSpaces/UserSpace";
import DataProvider from "./DataProvider";
import type { ApiResponse } from "./models/api_response";
<<<<<<< HEAD
import { webSocketClient } from "./Services/WebSocketClient";
=======
import MachineAPI_Service from "./Services/machine_api_service";
>>>>>>> 6d15baa (adding all previous work)

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

<<<<<<< HEAD
export const LoginUserContext = createContext<Partial<UserType | null>>(null); //create a context to store the machines to be used by all components
=======
export const machinesContext = createContext<ApiResponse<Machine[]> | null>(
	null,
); //create a context to store the machines to be used by all components
>>>>>>> 6d15baa (adding all previous work)

function App() {
	/*Roles in the factory */
	const Roles = [
		{
<<<<<<< HEAD
			id: 1,
=======
>>>>>>> 6d15baa (adding all previous work)
			type: "Engineer",
			title: "Engineer",
			description: "Visualize data, send tasks, receive demands",
			icon: Factory,
		},
		{
<<<<<<< HEAD
			id: 2,
=======
>>>>>>> 6d15baa (adding all previous work)
			type: "Technician",
			title: "Technician",
			description: "View tasks, add comments, update status",
			icon: Wrench,
		},
		{
<<<<<<< HEAD
			id: 3,
=======
>>>>>>> 6d15baa (adding all previous work)
			type: "Director",
			title: "Director",
			description: "Manage users, stock, and send demands",
			icon: Users,
		},
	];
	/* ***************************************************/
<<<<<<< HEAD
	const [user, setUser] = useState<Partial<UserType | null>>(null); // null = not logged in
	/* this is the part of message sent to technician in task */

	// This function will be called by LoginPage when login succeeds
	const handleLogin = (userData: Partial<UserType>) => {
		setUser(userData); // Save the logged-in user
		console.log("Logged in as:", user?.username);
=======
	const [user, setUser] = useState(null); // null = not logged in
	/* this is the part of message sent to technician in task */

	// This function will be called by LoginPage when login succeeds
	const handleLogin = (userData) => {
		setUser(userData); // Save the logged-in user
		console.log("Logged in as:", userData);
>>>>>>> 6d15baa (adding all previous work)
	};

	// Optional: Logout function
	const handleLogout = () => {
		setUser(null);
<<<<<<< HEAD
		localStorage.clear(); //clear tokens and other info stored in localstorage
=======
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD

=======
>>>>>>> 6d15baa (adding all previous work)
	return (
		<div>
			{user ? (
				// ← USER IS LOGGED IN → Show dashboard or main app
				<div>
					{/*<Dashboard user={user} onLogout={handleLogout} >*/}
					<DashboardHeader
<<<<<<< HEAD
=======
						user={user}
>>>>>>> 6d15baa (adding all previous work)
						onLogout={handleLogout}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
					{/*provide the feteched data to the whole userspace */}
<<<<<<< HEAD
					{/*also provide the actual connected user */}

					<DataProvider>
						<UserSpace filterData={filterData} />
=======
					<DataProvider>
						<UserSpace filterData={filterData} user={user} />
>>>>>>> 6d15baa (adding all previous work)
					</DataProvider>
				</div>
			) : (
				// ← USER NOT LOGGED IN → Show login page

				<LoginPage onLogin={handleLogin} Roles={Roles} />
			)}
		</div>
	);
}
