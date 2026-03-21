import type { Request, Response } from "express";
import { BaseController } from "./BaseController";
export class N8nController extends BaseController {
	/**
	 * Read data from n8n
	 */
	public readFromN8n = async (req: Request, res: Response) => {
		try {
			const result = req.body; //get the data sent in the body of the request in n8n
			this.sendFrom_n8n("n8nRead", result); //send the data got from n8n via web socket
			res.status(200).json({
				status: 200,
				success: true,
				data: result,
			});
		} catch (error: any) {
			console.error("❌ N8N Read Error:", error.message);

			res.status(500).json({
				status: 500,
				success: false,
				message: "Failed to read from n8n",
				error:
					process.env.NODE_ENV === "production" ? undefined : error.message,
			});
		}
	};
}

// Export singleton instance
export const n8nController = new N8nController();
