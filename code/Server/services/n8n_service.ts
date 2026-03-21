// simple minimal service
import axios from "axios";

export class N8nService {
	private webhookUrl: string;
	private readWebhookUrl: string;

	constructor() {
		this.webhookUrl = process.env.N8N_WEBHOOK_URL || "";
		this.readWebhookUrl = `https://mtk-n8n.hopto.org/webhook-test/51062944-95ee-4ec5-93dc-c03b75994ac6`;

		if (!this.webhookUrl) {
			console.error("❌ N8N_WEBHOOK_URL not set in .env");
			throw new Error("N8N_WEBHOOK_URL missing");
		}

		console.log("✅ N8n Service ready");
	}

	/**
	 * Send data to n8n - ONE METHOD ONLY
	 */
	public async sendToN8n(event: string, data: any): Promise<boolean> {
		try {
			const payload = {
				event,
				data,
				timestamp: new Date().toISOString(),
			};

			console.log(`📤 Sending to n8n: ${event}`);

			const response = await axios.post(this.webhookUrl, payload, {
				timeout: 5000,
				headers: { "Content-Type": "application/json" },
			});

			console.log(`✅ Sent to n8n (${response.status})`);
			return true;
		} catch (error: any) {
			console.error("❌ N8N ERROR");

			if (error.response) {
				console.error("STATUS:", error.response.status);
				console.error("URL:", this.webhookUrl);
				console.error("DATA:", error.response.data);
			} else if (error.request) {
				console.error("NO RESPONSE (network)");
			} else {
				console.error("MESSAGE:", error.message);
			}
			return false;
		}
	}
}

// Singleton instance
export const n8nService = new N8nService();

/* ADVANCED n8n service
import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

export interface N8nWebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  source?: string;
}

export class N8nWebhookService {
  private static instance: N8nWebhookService;
  private axiosInstance: AxiosInstance;
  private webhookUrl: string;

  private constructor() {
    // Get webhook URL from environment variables
    this.webhookUrl = process.env.N8N_WEBHOOK_URL || '';
    
    if (!this.webhookUrl) {
      console.error('❌ N8N_WEBHOOK_URL environment variable is not set');
      throw new Error('N8N_WEBHOOK_URL environment variable is not set');
    }

    console.log(`✅ N8n Webhook Service initialized with URL: ${this.webhookUrl}`);

    // Create axios instance with configuration
    this.axiosInstance = axios.create({
      baseURL: this.webhookUrl,
      timeout: 10000, // 10 seconds timeout
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Your-Express-App/1.0'
      }
    });

    // Optional: Add request interceptor for logging
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`📤 Sending to n8n: ${config.method?.toUpperCase()} ${config.baseURL}`);
        console.log(`📦 Payload:`, config.data);
        return config;
      },
      (error) => {
        console.error('❌ N8n request setup error:', error.message);
        return Promise.reject(error);
      }
    );

    // Optional: Add response interceptor for logging
    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log(`✅ N8n response: ${response.status} ${response.statusText}`);
        return response;
      },
      (error) => {
        console.error('❌ N8n response error:', error.message);
        return Promise.reject(error);
      }
    );
  }

  // Singleton pattern - get single instance
   
  public static getInstance(): N8nWebhookService {
    if (!N8nWebhookService.instance) {
      console.log('🔄 Creating new N8nWebhookService instance');
      N8nWebhookService.instance = new N8nWebhookService();
    }
    return N8nWebhookService.instance;
  }

  
  //  Send data to n8n webhook
    //@param payload The data to send to n8n
    //@returns Promise with response from n8n
   
  public async sendToN8n(payload: N8nWebhookPayload): Promise<AxiosResponse> {
    console.log(`🚀 Sending to n8n - Event: ${payload.event}`);
    console.log(`📅 Timestamp: ${payload.timestamp}`);
    
    try {
      const response = await this.axiosInstance.post('', payload);
      
      console.log(`✅ Successfully sent to n8n. Status: ${response.status}`);
      console.log(`📨 Response from n8n:`, response.data);
      
      return response;
    } catch (error: any) {
      // Handle specific error cases
      if (error.code === 'ECONNREFUSED') {
        console.error('❌ Cannot connect to n8n. Is n8n running?');
        console.error('💡 Check if n8n server is started and URL is correct:', this.webhookUrl);
      } else if (error.response) {
        // n8n responded with error status
        console.error(`❌ N8n responded with error ${error.response.status}:`, error.response.data);
      } else if (error.request) {
        // Request was made but no response
        console.error('❌ No response from n8n. Request was sent but no reply received.');
        console.error('💡 Check network connection and n8n webhook configuration');
      } else {
        console.error('❌ Error setting up request to n8n:', error.message);
      }
      
      console.error('🔍 Full error details:', error);
      
      // Re-throw for controller to handle if needed
      throw error;
    }
  }

  
  //  Send a simple event with data
   // @param event Event name (e.g., 'task_created', 'user_updated')
    //@param data The data to send
    //@param source Optional source identifier
   
  public async sendEvent(event: string, data: any, source?: string): Promise<void> {
    console.log(`📨 Preparing event for n8n: ${event}`);
    console.log(`📊 Data:`, data);
    
    const payload: N8nWebhookPayload = {
      event,
      data,
      timestamp: new Date().toISOString(),
      source: source || 'express-app'
    };

    await this.sendToN8n(payload);
  }

  
  //  Quick send method - simplest usage
   
  public async quickSend(event: string, data: any): Promise<boolean> {
    try {
      await this.sendEvent(event, data);
      return true;
    } catch (error) {
      console.error(`❌ Failed to send event "${event}" to n8n`);
      return false;
    }
  }

  
  //  Update webhook URL dynamically (useful for testing)
   
  public setWebhookUrl(url: string): void {
    console.log(`🔄 Updating n8n webhook URL: ${this.webhookUrl} → ${url}`);
    this.webhookUrl = url;
    this.axiosInstance.defaults.baseURL = url;
  }

  
  //  Get current webhook URL
   
  public getWebhookUrl(): string {
    return this.webhookUrl;
  }
}

// Optional: Create a default instance for easy importing
export const n8nWebhookService = N8nWebhookService.getInstance();*/
