import type { NextFunction, Request, Response } from "express";
import type { Users } from "../../models/users";
import JWTService from "../services/JWT_Service";

// Extend Express Request type to include user
/*What it does: Adds a user property to Express Request object.
Why: So we can do req.user.user_id in controllers.
Without this: TypeScript error: "Property 'user' does not exist on type 'Request'". */
declare global {
	namespace Express {
		interface Request {
			user?: Partial<Users>;
		}
	}
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// 1. Get Authorization header
	const authHeader = req.headers.authorization;

	// 2. Check if header exists
	if (!authHeader) {
		return res.status(401).json({
			status: 401,
			message: "No authorization header provided",
		});
	}

	// 3. Extract token (format: "Bearer eyJhbGc...")
	/*What it does: Verifies header is Bearer <token> format.
    Correct: Bearer eyJhbGc.eyJ1c2Vy.5fW3c8
    Wrong: Token eyJhbGc... or just eyJhbGc... */
	const parts = authHeader.split(" ");

	if (parts.length !== 2 || parts[0] !== "Bearer") {
		return res.status(401).json({
			status: 401,
			message: "Invalid authorization format. Use: Bearer <token>",
		});
	}

	const token = parts[1];

	// 4. Verify token using our JWTService
	const decoded = JWTService.verify(token);

	// 5. Check if token is valid
	if (!decoded) {
		return res.status(401).json({
			status: 401,
			message: "Invalid or expired token",
		});
	}

	// 6. Attach user data to request object
	req.user = decoded;

	// 7. Continue to controller
	next();
};
