import cors from "cors";
import express from "express";
import CommentRouter from "../router/CommentRouter";
import DemandRouter from "../router/DemandRouter";
import LocationRouter from "../router/LocationRouter";
import MachineRouter from "../router/MachineRouter";
import PriorityRouter from "../router/PriorityRouter";
import RoleRouter from "../router/RoleRouter";
import Sensor_typeRouter from "../router/Sensor_typeRouter";
import SensorRouter from "../router/SensorRouter";
import StatusRouter from "../router/StatusRouter";
import TaskRouter from "../router/TaskRouter";
import UsersRouter from "../router/UsersRouter";

class Server {
	//properties
	private app = express();
	private router = express.Router();

	//constructor
	constructor() {
		//to allow react client to access the data of the server
		this.app.use(cors({ origin: process.env.ALLOW_ORIGIN }));

		//integrate the express middilware json to get property body of the HTTP in json
		this.app.use(express.json());
		//connect router to application
		this.app.use(this.router);

		//call routers
		this.routerList();
	}
	//methods

	//routr list that conatain all lists
	private routerList = () => {
		this.router.use("/api", new MachineRouter().getRoutes());
		this.router.use("/api", new RoleRouter().getRoutes());
		this.router.use("/api", new SensorRouter().getRoutes());
		this.router.use("/api", new StatusRouter().getRoutes());
		this.router.use("/api", new TaskRouter().getRoutes());
		this.router.use("/api", new LocationRouter().getRoutes());
		this.router.use("/api", new UsersRouter().getRoutes());
		this.router.use("/api", new PriorityRouter().getRoutes());
		this.router.use("/api", new DemandRouter().getRoutes());
		this.router.use("/api", new Sensor_typeRouter().getRoutes());
		this.router.use("/api", new CommentRouter().getRoutes());
	};
	//start server
	public startServer = () => {
		return this.app;
	};
}
export default Server;
