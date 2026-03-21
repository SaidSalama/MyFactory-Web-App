import type { Request, Response } from "express";
import PLCRepo from "../repositories/PLCRepo";

class PLCController {
	public connect = async (req: Request, res: Response) => {
		const connect = await new PLCRepo().connect();

		if (connect instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production"
						? "ERROR detected"
						: connect.message,
			});
			return;
		}
		//send a response with request status and json

		res.status(200).json({ status: 200, message: "communication established" });
	};

	public writeRegister = async (req: Request, res: Response) => {
		try {
			const { address, value } = req.body;

			// Basic validation
			if (typeof address !== "number" || typeof value !== "number") {
				return res.status(400).json({
					status: "error",
					message: "address and value must be numbers",
				});
			}

			if (!Number.isInteger(address) || !Number.isInteger(value)) {
				return res.status(400).json({
					status: "error",
					message: "address and value must be integers",
				});
			}

			await new PLCRepo().writeRegister(address, value);

			res.status(200).json({
				status: "success",
				message: `Register ${40001 + address} written successfully`,
				address,
				value,
			});
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Failed to write register";

			console.error("[PLCController] Write register error:", message);

			res.status(500).json({
				status: "error",
				message:
					process.env.NODE_ENV === "production"
						? "Internal server error"
						: message,
			});
		}
	};

	public writeCoil = async (req: Request, res: Response) => {
		try {
			const { address, value } = req.body;

			// Basic validation
			if (typeof address !== "number" || typeof value !== "boolean") {
				return res.status(400).json({
					status: 400,
					message: "address and value must be numbers|boolean",
				});
			}

			if (!Number.isInteger(address)) {
				return res.status(400).json({
					status: 400,
					message: "address and value must be integers|boolean",
				});
			}

			await new PLCRepo().writeCoil(address, value);

			res.status(200).json({
				status: 200,
				message: `Register ${0 + address} written successfully`,
				address,
				value,
			});
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Failed to write register";

			console.error("[PLCController] Write register error:", message);

			res.status(500).json({
				status: 500,
				message:
					process.env.NODE_ENV === "production"
						? "Internal server error"
						: message,
			});
		}
	};
}
export default PLCController;
