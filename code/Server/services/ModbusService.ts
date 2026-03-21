// src/services/ModbusService.ts
import ModbusRTU from "modbus-serial"; // ← correct import (default export)

class ModbusService {
	// Instance properties
	private client: ModbusRTU | null = null;
	private isConnecting: boolean = false;
	private reconnectTimer: NodeJS.Timeout | null = null;

	// Configuration (can be overridden or come from env)
	private readonly PLC_IP: string;
	private readonly PLC_PORT: number;
	private readonly UNIT_ID: number;
	private readonly TIMEOUT_MS: number;
	private readonly RECONNECT_DELAY_MS: number;

	constructor(
		plcIp: string = process.env.PLC_IP || "host.docker.internal", //host.docker.internal is used to get the host ip not the container
		plcPort: number = Number(process.env.PLC_PORT) || 502,
		unitId: number = Number(process.env.PLC_UNIT_ID) || 1,
		timeoutMs: number = 2000,
		reconnectDelayMs: number = 2000,
	) {
		this.PLC_IP = plcIp;
		this.PLC_PORT = plcPort;
		this.UNIT_ID = unitId;
		this.TIMEOUT_MS = timeoutMs;
		this.RECONNECT_DELAY_MS = reconnectDelayMs;
	}

	/**
	 * Establishes connection to the PLC with automatic retry
	 * Returns the connected client
	 */
	public async connect(): Promise<ModbusRTU> {
		// Already connected and healthy → return immediately
		if (this.client?.isOpen) {
			return this.client;
		}

		// Prevent multiple simultaneous connection attempts
		if (this.isConnecting) {
			return new Promise<ModbusRTU>((resolve) => {
				const check = setInterval(() => {
					if (!this.isConnecting && this.client?.isOpen) {
						clearInterval(check);
						resolve(this.client!);
					}
				}, 100);
			});
		}

		this.isConnecting = true;

		try {
			console.log(`Connecting to PLC at ${this.PLC_IP}:${this.PLC_PORT}...`);

			const client = new ModbusRTU();
			await client.connectTCP(this.PLC_IP, { port: this.PLC_PORT });
			client.setID(this.UNIT_ID);
			client.setTimeout(this.TIMEOUT_MS);

			console.log("Connected to PLC via Modbus TCP");

			this.client = client;

			// Handle unexpected disconnections / errors
			client.on("close", () => {
				console.warn("Modbus connection closed unexpectedly. Reconnecting...");
				//this.scheduleReconnect();  close the automatic reconnection temporarlt to solve the problem
			});

			client.on("error", (err) => {
				console.error("Modbus client error:", (err as Error).message);
				this.scheduleReconnect();
			});

			return client;
		} catch (err) {
			console.error("Connection error:", (err as Error).message);
			//this.scheduleReconnect();
			throw err;
		} finally {
			this.isConnecting = false;
		}
	}

	/**
	 * Schedules a reconnection attempt after delay
	 */
	private scheduleReconnect(): void {
		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer);
		}

		this.reconnectTimer = setTimeout(() => {
			console.log("Attempting Modbus reconnection...");
			this.connect().catch(() => {
				// Silent catch → next call will retry
			});
		}, this.RECONNECT_DELAY_MS);
	}

	/**
	 * Clean shutdown - important for graceful exit
	 */
	public async close(): Promise<void> {
		if (this.client) {
			try {
				await new Promise<void>((resolve, reject) => {
					this.client?.close((err) => {
						if (err) reject(err);
						else resolve();
					});
				});
				console.log("Modbus connection closed cleanly");
			} catch (err) {
				console.warn("Error during close:", (err as Error).message);
			} finally {
				this.client = null;
			}
		}

		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer);
			this.reconnectTimer = null;
		}
	}

	/**
	 * Write single register (function code 06)
	 */
	public async writeRegister(address: number, value: number): Promise<void> {
		const client = await this.connect(); // ensures we're connected

		try {
			await client.writeRegister(address, value);

			if (process.env.NODE_ENV !== "production") {
				console.log(`[Modbus] Wrote ${value} → register ${40001 + address}`);
			}
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : String(err);
			console.error(
				`[Modbus] Failed to write ${value} to register ${40001 + address}: ${message}`,
			);
			throw err;
		}
	}

	// Add more public methods as needed, examples:
	// public async readHoldingRegisters(start: number, count: number) { ... }
	// public async writeMultipleRegisters(address: number, values: number[]) { ... }
}

export default ModbusService;
// or: export { ModbusService }   ← if you want to instantiate yourself
