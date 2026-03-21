import WebSocketService from "../services/WebSocketService ";

export class BaseController {
	protected webSocketService: WebSocketService; //protected so it is a available for subclasses no everyone

	constructor() {
		// Get singleton instance
		this.webSocketService = WebSocketService.getInstance();
	}

	protected broadcastUpdate(
		tableName: string,
		action: "CREATE" | "UPDATE" | "DELETE",
		data: any,
	) {
		this.webSocketService.broadcastTableUpdate(tableName, action, data);
	}

	protected sendFrom_n8n(eventType: string, data: any) {
		this.webSocketService.broadcast(eventType, data);
	}
}
