import type { Location } from "./location";
import type { Status } from "./status";

type Machine = {
	//you should use the same row names of the table machine
	machine_id: number;
	name: string;
	location_id: number;
	status_id: number;
	efficency: number;
	last_maintenance: Date;

	//foreign keys
	status: Status;
	location: Location;
};
export type { Machine };
