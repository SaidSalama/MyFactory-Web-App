import type { Request, Response } from "express";
import type { Users } from "../../models/users";
import UsersRepo from "../repositories/users_repo";
import JWT_Service from "../services/JWT_Service";
import PasswordService from "../services/Password_service";

//import JWTService from "../services/jwt_service"; // You'll create this

class AuthController {
	public login = async (req: Request, res: Response) => {
		const { email, role_id, password } = req.body;

		// 1. Find user
		const user = (await new UsersRepo().FindByMail({
			email,
			role_id,
		})) as Users;

		if (user instanceof Error) {
			return res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "production" ? "ERROR" : user.message,
			});
		}

		if (!user) {
			return res.status(401).json({
				status: 401,
				message: "Invalid mail or role",
			});
		}

		// 2. Verify password only if there is a user
		else if (user) {
			const isValid = await PasswordService.verifyPassword(
				password,
				user.password as string,
			);

			if (!isValid) {
				return res.status(401).json({
					status: 401,
					message: "Invalid Password",
				});
			}

			// 3. Return success (without password!)
			const { password: _, ...safeUser } = user;

			// 4. Create JWT token
			const token = JWT_Service.sign({
				user_id: user.user_id,
				username: user.username,
				role_id: user.role_id,
			});

			//return the user data without password and token
			res.status(200).json({
				status: 200,
				message: "Login successful",
				data: {
					token,
					user: safeUser,
				},
			});
		}
	};

	/*public register = async (req: Request, res: Response) => {
    // Your existing user creation, but in AuthController
  };*/
}

export default AuthController;
