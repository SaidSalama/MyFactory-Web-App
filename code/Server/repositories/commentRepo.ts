import type { Comment } from "../../models/comment";
import type { Task } from "../../models/task";
import MySQLService from "../services/mysql_service";
<<<<<<< HEAD
import TaskRepo from "./task_repo";

class CommentRepo {
	private table = "comment";
	public selectAll = async (): Promise<Comment | unknown> => {
=======

class CommentRepo {
	private table = "comment";
	public selectAll = async (): Promise<Location[] | unknown> => {
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
		data: Partial<Comment>,
=======
		data: Partial<Task>,
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
			//console.log(query);
			//get the task to which to commen was added and return it so the controller can send it to the clients
			const result = await new TaskRepo().selectOne({ task_id: data.task_id });

			return result;
		} catch (error) {
			return error;
		}
	};

	public DeleteTaskComment = async (
		data: Partial<Comment>,
	): Promise<Comment | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:status_id means  qeury variable
		const sql = `
        DELETE FROM ${process.env.MYSQL_DATABASE}.${this.table} 
        WHERE ${this.table}.task_id= :task_id; 

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
=======
>>>>>>> 6d15baa (adding all previous work)
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
