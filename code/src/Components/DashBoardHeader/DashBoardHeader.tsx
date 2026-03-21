// src/components/DashboardHeader.jsx
import { LogOut, Search } from "lucide-react";
import "./DashBoardHeader.css";
import logo from "../../assets/MyFactory Logo.png";

export default function DashboardHeader({
<<<<<<< HEAD
=======
	user,
>>>>>>> 6d15baa (adding all previous work)
	onLogout,
	searchQuery,
	setSearchQuery,
}) {
<<<<<<< HEAD
	const LoggedInUser = localStorage.getItem("loggedInUser");
	const user = JSON.parse(LoggedInUser as string);
=======
>>>>>>> 6d15baa (adding all previous work)
	return (
		<header className="dashboard-header">
			<div className="header-container">
				{/* Left: Title + Welcome */}
				<div className="header-left">
					{/*<h1 className="header-title">{user.type} Dashboard</h1>
          <p className="header-subtitle">Welcome, {user.name}</p>*/}
					<img src={logo} alt="LOGO" />
<<<<<<< HEAD
					<h3>
						{" "}
						{user.username}'s Space : {user.role.name}
					</h3>
=======
					<h3> {user.type} Space</h3>
>>>>>>> 6d15baa (adding all previous work)
				</div>

				{/* Right: Search + Logout */}
				<div className="header-right">
					<div className="search-box">
						<Search className="search-icon" />
						<input
							type="text"
							placeholder="Filter Machines,Sensors,Tasks..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="search-input"
						/>
					</div>

					<button type="button" onClick={onLogout} className="logout-button">
						<LogOut className="logout-icon" />
						Logout
					</button>
				</div>
			</div>
		</header>
	);
}
