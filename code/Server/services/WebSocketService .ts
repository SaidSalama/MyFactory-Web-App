import { WebSocketServer, WebSocket } from 'ws';

class WebSocketService {
    private wss: WebSocketServer | null = null;
    private clients: Set<WebSocket> = new Set();
    
    private static instance: WebSocketService;
    
    //Singleton
    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }
    
    // Initialize WebSocket server
    public initialize(server: any) {
        if (this.wss) return; // Already initialized
        
        this.wss = new WebSocketServer({ server });
   
        //when a new client connects perform this function 
        this.wss.on('connection', (ws) => { // ws One single client connection (one browser tab, one mobile app, etc.)
            console.log('New WebSocket client connected');
            this.clients.add(ws);
            
            ws.on('close', () => {
                console.log('Client disconnected');
                this.clients.delete(ws);//remove the disconnected client from the clients set
            });
            
            ws.on('error', (error) => {
                console.error('WebSocket error:', error);
            });
            
            // Send initial connection message to only the new connected client
            ws.send(JSON.stringify({ 
                type: 'CONNECTED', 
                message: 'WebSocket connected successfully' 
            }));
        });
        
        console.log('WebSocket server started');
    }
    
    // Broadcast to all connected clients
    public broadcast(eventType: string, data: any) {
        if (!this.wss) {
            //checks thta if the websocket server has been initialized or not
            console.warn('WebSocket server not initialized');
            return;
        }
        
        //message to be send to all clients 
        const message = JSON.stringify({
            type: eventType,
            data: data,
            timestamp: new Date().toISOString()
        });
        
        this.clients.forEach((client) => {
            //check that the connection with the client is still open
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
    
    // Broadcast to specific table
    public broadcastTableUpdate(tableName: string, action: 'CREATE' | 'UPDATE' | 'DELETE', data: any) {
        this.broadcast(`TABLE_${tableName.toUpperCase()}_${action}`, {
            table: tableName,
            action: action,
            record: data
        });
    }
}

export default WebSocketService;