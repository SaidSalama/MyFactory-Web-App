import type { Location } from "../../models/location";
import type { Machine } from "../../models/machine";
import type { Status } from "../../models/status";
import MySQLService from "../services/mysql_service";
import LocationRepo from "./location_repo";
import StatusRepo from "./status_repo";

class MachineRepo {
	private table = "machine";
	public selectAll = async (): Promise<Machine[] | unknown> => {
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
			for (let i = 0; i < (query as Machine[]).length; i++) {
				const result = (query as Machine[])[i] as Machine;
				//to get the value of the foreign key status_id for all machines
				result.status = (await new StatusRepo().selectOne({
					status_id: result.status_id,
				})) as Status;
				result.location = (await new LocationRepo().selectOne({
					location_id: result.location_id,
				})) as Location;
			}
			return query;
		} catch (error) {
			return error;
		}
	};
	public selectOne = async (
		data: Partial<Machine>,
	): Promise<Machine | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:machine_id means  qeury variable
		const sql = `
        SELECT ${this.table}.*
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE ${this.table}.machine_id= :machine_id 

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			const result = (query as Machine[]).shift() as Machine;
			//to get the value of the foreign key status_id

			result.status = (await new StatusRepo().selectOne({
				status_id: result.status_id,
			})) as Status;

			result.location = (await new LocationRepo().selectOne({
				location_id: result.location_id,
			})) as Location;
			return result;
		} catch (error) {
			return error;
		}
	};

	public createMachine = async (
		data: Partial<Machine>,
	): Promise<Machine | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:machine_id means  qeury variable
		const sql = `
        INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
		VALUES(
		NULL,
		:name,
		:location_id,
		:status_id,
		:efficency,
		NULL
		) ;

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			//const result = (query as Machine[]).shift() as Machine;
			//to get the value of the foreign key status_id

			//result.status= (await new StatusRepo().selectOne({ status_id: result.status_id })) as Status;

			return query;
		} catch (error) {
			return error;
		}
	};

	public updateMachine_status = async (
		data: Partial<Machine>,
	): Promise<Machine | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:machine_id means  qeury variable
		const sql = `
        UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
		SET ${this.table}.status_id=:status_id
        WHERE ${this.table}.machine_id= :machine_id ;

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			//const result = (query as Machine[]).shift() as Machine;
			//to get the value of the foreign key status_id

			//result.status= (await new StatusRepo().selectOne({ status_id: result.status_id })) as Status;

			return query;
		} catch (error) {
			return error;
		}
	};

	public updateMachine_efficency = async (
		data: Partial<Machine>,
	): Promise<Machine | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:machine_id means  qeury variable
		const sql = `
        UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
		SET ${this.table}.efficency=:efficency
        WHERE ${this.table}.machine_id= :machine_id ;

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			//const result = (query as Machine[]).shift() as Machine;
			//to get the value of the foreign key status_id

			//result.status= (await new StatusRepo().selectOne({ status_id: result.status_id })) as Status;

			return query;
		} catch (error) {
			return error;
		}
	};

	public updateMachine_last_maintenance = async (
		data: Partial<Machine>,
	): Promise<Machine | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:machine_id means  qeury variable
		const sql = `
        UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
		SET ${this.table}.last_maintenance=:last_maintenance
        WHERE ${this.table}.machine_id= :machine_id ;

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			//const result = (query as Machine[]).shift() as Machine;
			//to get the value of the foreign key status_id

			//result.status= (await new StatusRepo().selectOne({ status_id: result.status_id })) as Status;

			return query;
		} catch (error) {
			return error;
		}
	};

	public deleteMachine = async (
		data: Partial<Machine>,
	): Promise<Machine | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:machine_id means  qeury variable
		const sql = `
        DELETE FROM ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE ${this.table}.machine_id= :machine_id ;

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			//const result = (query as Machine[]).shift() as Machine;
			//to get the value of the foreign key status_id

			//result.status= (await new StatusRepo().selectOne({ status_id: result.status_id })) as Status;

			return query;
		} catch (error) {
			return error;
		}
	};

	//Select the machines that are returned in task_repo
	//this is the part of the table of jointure
	public selectinList = async (list: string): Promise<Machine[] | unknown> => {
		if (!list) return [];
		const connection = await new MySQLService().connect();
		const sql = `
	SELECT ${this.table}.*
	FROM ${process.env.MYSQL_DATABASE}.${this.table}
	WHERE ${this.table}.machine_id IN (${list});
	`;
		//execute the query
		try {
			const [query] = await connection.execute(sql);
			console.log(query);
			for (let i = 0; i < (query as Machine[]).length; i++) {
				const result = (query as Machine[])[i] as Machine;
				//to get the value of the foreign key status_id for all machines
				result.status = (await new StatusRepo().selectOne({
					status_id: result.status_id,
				})) as Status;
			}
			return query;
		} catch (error) {
			return error;
		}
	};
}
export default MachineRepo;
