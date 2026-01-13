import type { Machine } from "./machine";
import type { Sensor_type } from "./sensor_type";

type Sensor = {
	sensor_id: number;
	sensortype_id: number;
	value: number;
	machine_id: number;
	name: string;
	//the foreign key table
	machine: Machine;
	type: Sensor_type;
};
export type { Sensor };
