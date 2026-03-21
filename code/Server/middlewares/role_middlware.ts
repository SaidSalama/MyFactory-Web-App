import type { NextFunction, Request, Response } from "express";

export const roleMiddleware = (allowedRoles: number[]) => {
	//allwoed roles are the  can make the request
	/*it can be 1-engineer , 2-technician , 3-director */
	return (req: Request, res: Response, next: NextFunction) => {
		// 1. Get user from request (set by authMiddleware)
		const user = req.user;

		// 2. Check if user exists
		if (!user) {
			return res.status(401).json({
				status: 401,
				message: "User not authenticated",
			});
		}

		// 3. Check if user has role_id
		if (!user.role_id) {
			return res.status(403).json({
				status: 403,
				message: "User has no role assigned",
			});
		}

		// 4. Check if user's role is in allowed roles
		if (!allowedRoles.includes(user.role_id)) {
			return res.status(403).json({
				status: 403,
				message: `Access denied. Your role can not do this functionality`,
			});
		}

		// 5. User has correct role → continue
		next();
	};
};
