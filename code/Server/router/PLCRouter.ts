import express from "express";
import PLCController from "../controller/PLCController";

class PLCRouter {
	private router = express.Router();

	// Create ONE instance (singleton pattern - most common for Modbus connection)
	//private modbusService = new ModbusService();

	constructor() {
		// Option A - using arrow function (preserves this)
		this.router.get("/PLC", new PLCController().connect);
		this.router.post("/PLC", new PLCController().writeRegister);
		this.router.post("/PLC/coil", new PLCController().writeCoil);

		// Option B - using .bind()
		// this.router.get("/PLC", this.modbusService.connect.bind(this.modbusService));
	}

	public getRoutes() {
		return this.router;
	}
}
export default PLCRouter;
