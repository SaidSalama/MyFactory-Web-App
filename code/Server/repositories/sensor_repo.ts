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
<<<<<<< HEAD
			//console.log(results);
			for (let i = 0; i < (results as Sensor[]).length; i++) {
				//element is a reference of the object result[i] so any change in element will affect results[i]
=======
			console.log(results);
			for (let i = 0; i < (results as Sensor[]).length; i++) {
>>>>>>> 6d15baa (adding all previous work)
				const element = (results as Sensor[])[i];

				element.machine = (await new MachineRepo().selectOne({
					machine_id: element.machine_id,
				})) as Machine;

				element.type = (await new Sensor_typeRepo().selectOne({
					sensortype_id: element.sensortype_id,
				})) as Sensor_type;
			}
<<<<<<< HEAD
			return results; //return the array of sensors
=======
			return results;
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
			//console.log(query);
			//get the first element
			const result = (query as Sensor[]).shift() as Sensor;
			//to ge the value of the foreign key machine for the sensor
			result.machine = (await new MachineRepo().selectOne({
				machine_id: result.machine_id,
			})) as Machine;
			result.type = (await new Sensor_typeRepo().selectOne({
					sensortype_id: result.sensortype_id,
				})) as Sensor_type;
			return result; //return only one sensor
=======
			console.log(query);
			//get the first element
			const result = (query as Sensor[]).shift() as Sensor;
			//to ge the value of the foreign key machine for all sensors
			result.machine = (await new MachineRepo().selectOne({
				machine_id: result.machine_id,
			})) as Machine;
			return result;
>>>>>>> 6d15baa (adding all previous work)
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

<<<<<<< HEAD
	/*create function without websocket */
	/*public create = async (data: Partial<Sensor>): Promise<Sensor | unknown> => {
=======
	public create = async (data: Partial<Sensor>): Promise<Sensor | unknown> => {
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
*/
	
	/*create function with websocket */
	public create = async (data: Partial<Sensor>): Promise<Sensor | unknown> => {
    const connection = await new MySQLService().connect();
    
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
    
    try {
        // 1. Insert the sensor
        const [query] = await connection.execute(sql, data);
        // 2. Get the new sensor ID
        const newSensorId = (query as any).insertId;
        // 3. Fetch the complete sensor using the ID
       	const sensorResult:Sensor = await new SensorRepo().selectOne({sensor_id: newSensorId}) as Sensor;
        console.log("Created sensor:", sensorResult);
        return sensorResult; // ← Return the SENSOR, not the query so the controller can send it 
        
    } catch (error) {
        return error;
    }
	};
	/*delete function without web socket */
	/*public delete = async (data: Partial<Sensor>): Promise<Sensor | unknown> => {
=======

	public delete = async (data: Partial<Sensor>): Promise<Sensor | unknown> => {
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
	};*/

	/*delete function with websocket */
	public delete = async (data: Partial<Sensor>): Promise<Sensor | unknown> => {
    const connection = await new MySQLService().connect();
    
    try {
        // 1. FIRST: Get the sensor that will be deleted
		 const sensorToDelete =  await new SensorRepo().selectOne({sensor_id: data.sensor_id}) as Sensor;/*(sensorResult as Sensor[])[0];*/
        
        if (!sensorToDelete) {
            throw new Error(`Sensor with ID ${data.sensor_id} not found`);
        }
        
        console.log("Sensor to delete:", sensorToDelete);
        
        // 2. THEN: Delete it
        const sql = `DELETE FROM ${this.table} WHERE sensor_id = :sensor_id`;
        const [deleteResult] = await connection.execute(sql, data);
        
        console.log("Delete result:", deleteResult);
        
        // 3. Return the sensor that WAS deleted to be sent to the client 
        return sensorToDelete;
        
    } catch (error) {
        console.error("Delete error:", error);
        return error;
    }
};

=======
	};
>>>>>>> 6d15baa (adding all previous work)
}
export default SensorRepo;
