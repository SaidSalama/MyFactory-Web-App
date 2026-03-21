import express from "express";
import MachineController from "../controller/MachineController";

class MachineRouter {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/Machine", new MachineController().index);
		//create a get router with router variables
		this.router.get("/Machine/:machine_id", new MachineController().selectOne);
		//create a machine
		this.router.post("/Machine", new MachineController().createMachine);
		//update the status

		this.router.put(
			"/Machine/status",
			new MachineController().updateMachine_status,
		);

		this.router.put(
			"/Machine/efficency",
			new MachineController().updateMachine_efficency,
		);
		this.router.put(
			"/Machine/last_maintenance",
			new MachineController().updateMachine_last_maintenance,
		);
		this.router.delete("/Machine", new MachineController().deleteMachine);

		return this.router;
	};
}
export default MachineRouter;
