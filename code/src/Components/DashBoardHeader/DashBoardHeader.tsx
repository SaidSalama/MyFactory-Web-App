// src/components/DashboardHeader.jsx
import { LogOut, Search } from "lucide-react";
import "./DashBoardHeader.css";
import logo from "../../assets/MyFactory Logo.png";

export default function DashboardHeader({
	onLogout,
	searchQuery,
	setSearchQuery,
}) {
	const LoggedInUser = localStorage.getItem("loggedInUser");
	const user = JSON.parse(LoggedInUser as string);
	return (
		<header className="dashboard-header">
			<div className="header-container">
				{/* Left: Title + Welcome */}
				<div className="header-left">
					{/*<h1 className="header-title">{user.type} Dashboard</h1>
          <p className="header-subtitle">Welcome, {user.name}</p>*/}
					<img src={logo} alt="LOGO" />
					<h3>
						{" "}
						{user.username}'s Space : {user.role.name}
					</h3>
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
