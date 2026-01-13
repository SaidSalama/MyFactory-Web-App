import type { Role } from "../../models/role";
import MySQLService from "../services/mysql_service";

class RoleRepo {
	private table = "role";
	public selectAll = async (): Promise<Role[] | unknown> => {
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
			return query;
		} catch (error) {
			return error;
		}
	};
	public selectOne = async (data: Partial<Role>): Promise<Role | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:machine_id means  qeury variable
		const sql = `
        SELECT ${this.table}.*
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE ${this.table}.role_id= :role_id 

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			const result = (query as Role[]).shift();

			return result;
		} catch (error) {
			return error;
		}
	};
}
export default RoleRepo;
