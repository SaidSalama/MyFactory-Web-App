import type { Status } from "./status";
import type { Users } from "./users";

type Demand = {
	demand_id: number;
	title: string;
	description: string;
	deadline: Date | null | string; //string because the mysql server accepts strinf for date variables
	created_by: number;
	status_id: number;

	creator: Users;
	status: Status;
};
export type { Demand };
