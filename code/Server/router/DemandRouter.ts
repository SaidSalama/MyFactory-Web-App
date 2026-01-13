import express from "express";
import DemandController from "../controller/Demand_Controller";

class DemandRouter {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/Demand", new DemandController().index);
		//create a get router with router variables
		this.router.get("/Demand/:demand_id", new DemandController().selectOne);

		this.router.put(
			"/Demand/:demand_id",
			new DemandController().markDemand_completed,
		);

		this.router.post("/Demand", new DemandController().inset_Demand);
		this.router.delete("/Demand", new DemandController().delete_Demand);
		return this.router;
	};
}
export default DemandRouter;
