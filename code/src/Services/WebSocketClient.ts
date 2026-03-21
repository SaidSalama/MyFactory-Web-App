class WebSocketClient {
    private socket: WebSocket | null = null;
    private messageCallbacks: Map<string, Function[]> = new Map();
    
    constructor() {
        // We'll initialize later
    }
    
    // Connect to WebSocket server
    public connect() {
        // If already connected, do nothing
        if (this.socket?.readyState === WebSocket.OPEN) {
            console.log('Already connected to WebSocket');
            return;
        }
        
        // Create WebSocket connection
        const wsUrl = `ws://localhost:3000/ws`;
        this.socket = new WebSocket(wsUrl);
        
        // Set up event handlers
        this.socket.onopen = () => {
            console.log('✅ Connected to WebSocket server');
        };
        
        this.socket.onmessage = (event) => {
            console.log('📨 Message received:', event.data);
            
            try {
                const data = JSON.parse(event.data);
                //console.log('📦 Parsed data:', data);
                
                // Get the event type from the message
                // Check different possible properties
                const eventType = data.type || data.event || '*';
                
                // Call ALL registered callbacks for this event type
                const callbacks = this.messageCallbacks.get(eventType) || [];
                callbacks.forEach(callback => callback(data));
                
                // Also call general callbacks (for all messages)
                const generalCallbacks = this.messageCallbacks.get('*') || [];
                generalCallbacks.forEach(callback => callback(data));
                
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };
        
        this.socket.onerror = (error) => {
            console.error('❌ WebSocket error:', error);
        };
        
        this.socket.onclose = () => {
            console.log('🔌 WebSocket disconnected');
            // Try to reconnect after 3 seconds
            setTimeout(() => {
                console.log('🔄 Attempting to reconnect...');
                this.connect();
            }, 3000);
        };
    }
    
    // Register a callback for specific event types
    public on(eventType: string, callback: Function) {
        if (!this.messageCallbacks.has(eventType)) {
            this.messageCallbacks.set(eventType, []);
        }
        this.messageCallbacks.get(eventType)?.push(callback);
        console.log(`Registered callback for event: ${eventType}`);
    }
    
    // Remove a callback
    public off(eventType: string, callback: Function) {
        const callbacks = this.messageCallbacks.get(eventType);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
                console.log(`Removed callback for event: ${eventType}`);
            }
        }
    }
    
    // Clear all callbacks
    public clearCallbacks() {
        this.messageCallbacks.clear();
        console.log('Cleared all WebSocket callbacks');
    }
    
    // Disconnect from WebSocket
    public disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.clearCallbacks();
    }
    
    // Send message to server (if needed)
    public send(message: any) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.warn('Cannot send, WebSocket not connected');
        }
    }
}

// Create a single instance (singleton)
export const webSocketClient = new WebSocketClient();