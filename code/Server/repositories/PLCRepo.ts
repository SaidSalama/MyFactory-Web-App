import ModbusService from "../services/ModbusService";

class PLCRepo {
	private queue: Promise<unknown> = Promise.resolve();

	//A function used to make a queue for the modbus request
	private runExclusive<T>(fn: () => Promise<T>): Promise<T> {
		const result = this.queue.then(fn);

		// keep queue alive even if fn throws
		this.queue = result.catch(() => {});

		return result;
	}

	public connect = async () => {
		const client = new ModbusService().connect();
		try {
			return client;
		} catch (err) {
			console.log(`error in connection is ${err}`);
			return err;
		}
	};
	public async writeRegister(address: number, value: number): Promise<void> {
		try {
			const client = await new ModbusService().connect(); //await this.connect(); // single shared connection

			console.log("Start write");
			await client.writeRegister(address, value);
			console.log("Finish write");

			if (process.env.NODE_ENV !== "production") {
				console.log(`[Modbus] Wrote ${value} → register ${40001 + address}`);
			}
			client.close(); //close the communication to solve the problem temporarly
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : String(err);
			console.error(
				`[Modbus] Failed to write ${value} to register ${40001 + address}: ${message}`,
			);
			throw err; // propagate to controller
		}
	}

	public async writeCoil(address: number, value: boolean): Promise<void> {
		try {
			const client = await new ModbusService().connect(); //await this.connect(); // single shared connection

			console.log("Start write coil");
			await client.writeCoil(address, value);
			console.log("Finish write coil");

			if (process.env.NODE_ENV !== "production") {
				console.log(`[Modbus] Wrote ${value} → coil ${0 + address}`);
			}
			client.close(); //close the communication to solve the problem temporarly
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : String(err);
			console.error(
				`[Modbus] Failed to write ${value} to coil ${0 + address}: ${message}`,
			);
			throw err; // propagate to controller
		}
	}
}
export default PLCRepo;
