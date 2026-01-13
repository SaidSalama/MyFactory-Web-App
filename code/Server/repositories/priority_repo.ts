import type { Priority } from "../../models/priority";
import MySQLService from "../services/mysql_service";


class PriorityRepo {
	private table = "priority";
	public selectAll = async (): Promise<Priority[] | unknown> => {
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
			for (let i = 0; i < (query as Priority[]).length; i++) {
				const result = (query as Priority[])[i] as Priority;
				console.log(result);
				
			}
			return query;
		} catch (error) {
			return error;
		}
	};
	public selectOne = async (
		data: Partial<Priority>,
	): Promise<Priority | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:status_id means  qeury variable
		const sql = `
        SELECT ${this.table}.*
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE ${this.table}.priority_id= :priority_id; 

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			const result = (query as Priority[]).shift();

			return result;
		} catch (error) {
			return error;
		}
	};
}
export default PriorityRepo;
/* */