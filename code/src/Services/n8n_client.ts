// frontend/src/services/n8nFrontendService.ts

import type { Users } from "../../models/users";

/**
 * Simple service to send messages to n8n webhook
 */
class n8nClientService {
	private webhookUrl: string;

	constructor() {
		// Get webhook URL from environment variables
		this.webhookUrl = `https://mtk-n8n.hopto.org/webhook/51062944-95ee-4ec5-93dc-c03b75994ac6`;

		if (!this.webhookUrl) {
			console.error("❌ VITE_N8N_WEBHOOK_URL is not set in .env file");
		}
	}

	/**
	 * Send a message to n8n webhook
	 * @param message The message to send
	 * @returns Promise with the response
	 */
	async sendMessage(message: string, user: Partial<Users>): Promise<any> {
		try {
			// Prepare the payload
			const payload = {
				chatInput: message,
				senidngUser: user,
				timestamp: new Date().toISOString(),
				source: "frontend-app",
			};

			console.log("📤 Sending to n8n:", payload);

			// Send to n8n webhook
			const response = await fetch(this.webhookUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			// Check if request was successful
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// Parse response
			const data = await response.json();
			console.log("✅ Response from n8n:", data);

			return data;
		} catch (error) {
			console.error("❌ Failed to send message to n8n:", error);
			throw error;
		}
	}

	/**
	 * Reset session (start new conversation)
	 */
	resetSession(): void {
		localStorage.removeItem("n8n_session_id");
		console.log("🔄 Session reset");
	}
}

// Create and export a single instance
export const n8nService = new n8nClientService();
