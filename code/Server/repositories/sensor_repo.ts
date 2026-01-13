import type { Machine } from "../../models/machine";
import type { Sensor } from "../../models/sensor";
import type { Sensor_type } from "../../models/sensor_type";
import MySQLService from "../services/mysql_service";
import MachineRepo from "./machine_repo";
import Sensor_typeRepo from "./sensor_type_repo";

class SensorRepo {
	private table = "sensor";
	public SelectAll = async (): Promise<Sensor[] | unknown> => {
		const connetion = await new MySQLService().connect();
		const sql = `
        SELECT * FROM ${process.env.MYSQL_DATABASE}.${this.table}
        `;
		try {
			const [results] = await connetion.execute(sql);
			console.log(results);
			for (let i = 0; i < (results as Sensor[]).length; i++) {
				const element = (results as Sensor[])[i];

				element.machine = (await new MachineRepo().selectOne({
					machine_id: element.machine_id,
				})) as Machine;

				element.type = (await new Sensor_typeRepo().selectOne({
					sensortype_id: element.sensortype_id,
				})) as Sensor_type;
			}
			return results;
		} catch (error) {
			return error;
		}
	};
	public selectOne = async (
		data: Partial<Sensor>,
	): Promise<Sensor | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:machine_id means  qeury variable
		const sql = `
        SELECT ${this.table}.*
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE ${this.table}.sensor_id= :sensor_id 

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			const result = (query as Sensor[]).shift() as Sensor;
			//to ge the value of the foreign key machine for all sensors
			result.machine = (await new MachineRepo().selectOne({
				machine_id: result.machine_id,
			})) as Machine;
			return result;
		} catch (error) {
			return error;
		}
	};

	public updateValue = async (
		data: Partial<Sensor>,
	): Promise<Sensor | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:machine_id means  qeury variable
		const sql = `
        UPDATE ${this.table}
        SET value=:value
        WHERE ${this.table}.sensor_id= :sensor_id 

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			//const result = (query as Sensor[]).shift() as Sensor;
			//to ge the value of the foreign key machine for all sensors
			return query;
		} catch (error) {
			return error;
		}
	};

	public create = async (data: Partial<Sensor>): Promise<Sensor | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:machine_id means  qeury variable
		const sql = `
        INSERT INTO ${this.table}
        VALUES(
		NULL,
		:sensortype_id,
		:value,
		:machine_id,
		:name

		
		)

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			//const result = (query as Sensor[]).shift() as Sensor;
			//to ge the value of the foreign key machine for all sensors
			return query;
		} catch (error) {
			return error;
		}
	};

	public delete = async (data: Partial<Sensor>): Promise<Sensor | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:machine_id means  qeury variable
		const sql = `
        DELETE FROM ${this.table}
       WHERE ${this.table}.sensor_id=:sensor_id
        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			//const result = (query as Sensor[]).shift() as Sensor;
			//to ge the value of the foreign key machine for all sensors
			return query;
		} catch (error) {
			return error;
		}
	};
}
export default SensorRepo;
