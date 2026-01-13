import { type SetStateAction, useState } from "react";
import "./LoginPage.css"; // Import the CSS
import logo from "../../assets/MyFactory Logo.png";

export default function LoginPage({ onLogin, Roles }) {
	const [selectedType, setSelectedType] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedType && email && password) {
			onLogin({
				id: "1",
				name: email.split("@")[0],
				email,
				type: selectedType,
				username: "Said ",
				//these must be the real user data as in database
			});
		}
	};

	const userTypes = Roles;

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
							{userTypes.map((userType) => (
								<button
									type="button"
									key={userType.type}
									onClick={() => setSelectedType(userType.type)}
									className="role-button"
								>
									<userType.icon className="role-icon" />
									<h3 className="role-title">{userType.title}</h3>
									<p className="role-desc">{userType.description}</p>
								</button>
							))}
						</div>
					) : (
						<form onSubmit={handleSubmit} className="form-container">
							<div style={{ textAlign: "center", marginBottom: "24px" }}>
								<button
									type="button"
									onClick={() => setSelectedType(null)}
									className="back-button"
								>
									← Change Role
								</button>
								<h3 className="form-title">
									Login as{" "}
									{userTypes.find((t) => t.type === selectedType)?.title}
								</h3>
							</div>

							<div className="login-form-group">
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
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
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="form-input"
								/>
							</div>

							<button type="submit" className="submit-button">
								Login
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
