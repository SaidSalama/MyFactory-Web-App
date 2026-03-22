import { type SetStateAction, useState } from "react";
import "./LoginPage.css"; // Import the CSS
import type { Users } from "../../../models/users";
import logo from "../../assets/MyFactory Logo.png";
import AuthAPI_Service from "../../Services/auth_api_service";

export default function LoginPage({ onLogin, Roles }) {
	const [selectedType, setSelectedType] = useState(null);
	const [formError, setFormError] = useState("");
	const [ConnectedUser, setConnectedUser] = useState<Partial<Users>>({
		email: "",
		password: "",
		role_id: 0,
	});
	const [ActualUser, setActualUser] = useState<Partial<Users>>({
		user_id: 0,
		username: "",
		email: "",
		role_id: 0,
	});

	const handleLogin = async () => {
		const response = await new AuthAPI_Service().login(ConnectedUser);

		if (response.status === 200) {
			const loggedInUser = response.data?.user;
			const token = response.data?.token;
			//save the token in local storage then delete it when disconnecting
			localStorage.setItem("token", token as string);

			setActualUser(loggedInUser as Users);
			setFormError("");

			// Use the response directly, not state
			setTimeout(() => {
				onLogin(loggedInUser);
				console.log("User connected:", loggedInUser?.username);
				localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser)); //store data of the user without password in local storage
			}, 1500);
		} else {
			setFormError(response.message);
		}
	};

	return (
		<div className="login-container">
			<img src={logo} alt="Imagee"></img>
			<div className="login-card">
				<div className="login-card-header">
					<h1 className="login-card-title">Factory Management System</h1>
					{!selectedType ? (
						<p className="login-card-description">
							Select your role to continue
						</p>
					) : (
						<p className="login-card-description">Log In to your account</p>
					)}
				</div>

				<div className="login-card-content">
					{!selectedType ? (
						<div className="role-grid">
							{Roles.map((userType: any) => (
								<button
									type="button"
									key={userType.type}
									onClick={() => {
										setSelectedType(userType.type);
										//when choosing a role set the role_id of the connected user to this role
										setConnectedUser({
											...ConnectedUser,
											role_id: userType.id,
										});
									}}
									className="role-button"
								>
									<userType.icon className="role-icon" />
									<h3 className="role-title">{userType.title}</h3>
									<p className="role-desc">{userType.description}</p>
								</button>
							))}
						</div>
					) : (
						<>
							<form
								onSubmit={async (e) => {
									e.preventDefault();
									handleLogin();
								}}
								className="form-container"
							>
								<div style={{ textAlign: "center", marginBottom: "24px" }}>
									<button
										type="button"
										onClick={() => {
											//reinitialize all inputs from previous user
											setSelectedType(null);
											setConnectedUser({ email: "", password: "" });
											setFormError("");
										}}
										className="back-button"
									>
										← Change Role
									</button>
									<h3 className="form-title">
										Login as {Roles.find((t) => t.type === selectedType)?.title}
									</h3>
								</div>
								{formError && <p style={{ color: "red" }}>{formError} *</p>}
								<div className="login-form-group">
									<label htmlFor="email" className="form-label">
										Email
									</label>
									<input
										id="email"
										type="email"
										placeholder="Enter your email"
										value={ConnectedUser.email}
										onChange={(e) =>
											setConnectedUser({
												...ConnectedUser,
												email: e.target.value,
											})
										}
										required
										className="form-input"
									/>
								</div>

								<div className="login-form-group">
									<label htmlFor="password" className="form-label">
										Password
									</label>
									<input
										id="password"
										type="password"
										placeholder="Enter your password"
										value={ConnectedUser.password}
										onChange={(e) =>
											setConnectedUser({
												...ConnectedUser,
												password: e.target.value,
											})
										}
										required
										className="form-input"
									/>
								</div>

								<button type="submit" className="submit-button">
									Login
								</button>
							</form>
							{ActualUser.username !== "" && (
								<p style={{ color: "green" }}>
									connecting {ActualUser.username}....
								</p>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
