import type { Sensor_type } from "../../models/sensor_type";
import MySQLService from "../services/mysql_service";


class Sensor_typeRepo {
	private table = "sensor_type";
	public selectAll = async (): Promise<Sensor_type[] | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		const sql = `
        SELECT ${this.table}.*
        FROM ${process.env.MYSQL_DATABASE}.${this.table};

        `;
		//execute the query
		try {
			const [query] = await connection.execute(sql);
			console.log(query);
			for (let i = 0; i < (query as Sensor_type[]).length; i++) {
				const result = (query as Sensor_type[])[i] as Sensor_type;
				console.log(result);
				
			}
			return query;
		} catch (error) {
			return error;
		}
	};
	public selectOne = async (
		data: Partial<Sensor_type>,
	): Promise<Sensor_type | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:status_id means  qeury variable
		const sql = `
        SELECT ${this.table}.*
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE ${this.table}.sensortype_id= :sensortype_id; 

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			const result = (query as Sensor_type[]).shift();

			return result;
		} catch (error) {
			return error;
		}
	};
}
export default Sensor_typeRepo;
/* */