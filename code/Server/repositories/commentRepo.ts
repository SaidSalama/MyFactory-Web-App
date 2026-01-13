import type { Comment } from "../../models/comment";
import type { Task } from "../../models/task";
import MySQLService from "../services/mysql_service";

class CommentRepo {
	private table = "comment";
	public selectAll = async (): Promise<Location[] | unknown> => {
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
			for (let i = 0; i < (query as Comment[]).length; i++) {
				const result = (query as Comment[])[i] as Comment;
				console.log(result);
			}
			return query;
		} catch (error) {
			return error;
		}
	};
	public selectOne = async (
		data: Partial<Comment>,
	): Promise<Comment | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:status_id means  qeury variable
		const sql = `
        SELECT ${this.table}.*
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE ${this.table}.comment_id= :comment_id; 

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			const result = (query as Comment[]).shift();

			return result;
		} catch (error) {
			return error;
		}
	};

	public GetTaskComment = async (
		data: Partial<Task>,
	): Promise<Comment | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:status_id means  qeury variable
		const sql = `
        SELECT ${this.table}.*
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE ${this.table}.task_id= :task_id; 

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			const result = query as Comment[];

			return result;
		} catch (error) {
			return error;
		}
	};

	public CreateTaskComment = async (
		data: Partial<Task>,
	): Promise<Comment | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:status_id means  qeury variable
		const sql = `
        INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
        VALUES (
		NULL,
		:task_id,
		:value
		
		)
        ;

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			const result = query as Comment[];

			return result;
		} catch (error) {
			return error;
		}
	};
}
export default CommentRepo;
/* */
