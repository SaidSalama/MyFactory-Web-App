import type { QueryResult } from "mysql2";
import type { Comment } from "../../models/comment";
import type { Machine } from "../../models/machine";
import type { Priority } from "../../models/priority";
import type { Status } from "../../models/status";
import type { Task } from "../../models/task";
import type { Users } from "../../models/users";
import MySQLService from "../services/mysql_service";
import CommentRepo from "./commentRepo";
import MachineRepo from "./machine_repo";
import PriorityRepo from "./priority_repo";
import StatusRepo from "./status_repo";
import UsersRepo from "./users_repo";

class TaskRepo {
	private table = "task";
	public selectAll = async (): Promise<Task[] | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		const sql =
			/*This is the query that will add machine_ids to tasks so each row will contain task title and list of ids of machines */
			`
		SELECT   ${this.table}.*,   GROUP_CONCAT(machine.machine_id) AS machine_ids FROM ${this.table} 
		LEFT JOIN machine_task  ON ${this.table}.task_id = machine_task.task_id 
		LEFT JOIN machine ON machine.machine_id = machine_task.machine_id 
		GROUP BY ${this.table}.task_id;

        `;
		//execute the query
		try {
			const [query] = await connection.execute(sql);
			console.log(query);
			for (let i = 0; i < (query as Task[]).length; i++) {
				const result = (query as Task[])[i] as Task;
<<<<<<< HEAD
				//console.log(result);
=======
				console.log(result);
>>>>>>> 6d15baa (adding all previous work)

				result.machines = (await new MachineRepo().selectinList(
					result.machine_ids,
				)) as Machine[];
				result.creator = (await new UsersRepo().selectOne({
					user_id: result.created_by,
				})) as Users;
				result.assignee = (await new UsersRepo().selectOne({
					user_id: result.assigned_to,
				})) as Users;
				result.priority = (await new PriorityRepo().selectOne({
					priority_id: result.priority_id,
				})) as Priority;
				result.status = (await new StatusRepo().selectOne({
					status_id: result.status_id,
				})) as Status;
				result.comments = (await new CommentRepo().GetTaskComment({
					task_id: result.task_id,
				})) as Comment[];
			}
			return query;
		} catch (error) {
			return error;
		}
	};
	public selectOne = async (data: Partial<Task>): Promise<Task | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:status_id means  qeury variable
		const sql = `
<<<<<<< HEAD
    		SELECT
				${this.table}.*,
				GROUP_CONCAT(machine.machine_id) AS machine_ids
			FROM ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN machine_task
				ON ${this.table}.task_id = machine_task.task_id
			LEFT JOIN machine
				ON machine.machine_id = machine_task.machine_id
			WHERE ${this.table}.task_id = :task_id
			GROUP BY ${this.table}.task_id
		`;
=======
        SELECT ${this.table}.*
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE ${this.table}.task_id= :task_id 

        `;
>>>>>>> 6d15baa (adding all previous work)
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			const result = (query as Task[]).shift() as Task;
			result.machines = (await new MachineRepo().selectinList(
				result.machine_ids,
			)) as Machine[];
			result.creator = (await new UsersRepo().selectOne({
				user_id: result.created_by,
			})) as Users;
			result.assignee = (await new UsersRepo().selectOne({
				user_id: result.assigned_to,
			})) as Users;
			result.priority = (await new PriorityRepo().selectOne({
				priority_id: result.priority_id,
			})) as Priority;
			result.status = (await new StatusRepo().selectOne({
				status_id: result.status_id,
			})) as Status;
			result.comments = (await new CommentRepo().GetTaskComment({
				task_id: result.task_id,
			})) as Comment[];

			return result;
		} catch (error) {
			return error;
		}
	};

	//insert a task  method
	public insert = async (
		data: Partial<Task>,
	): Promise<QueryResult | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
	INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
	VALUE (
	
			NULL,
			:created_by,
			:description,
			:priority_id,
			:deadline,
			:status_id,
			:title,
			:assigned_to
	);
	`;
		//the order of the variables must be identical to the order in table in SQL
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element

			return query;
		} catch (error) {
			return error;
		}
	};

	public updatestatus = async (
		data: Partial<Task>,
<<<<<<< HEAD
	): Promise<Task | unknown> => {
=======
	): Promise<QueryResult | unknown> => {
>>>>>>> 6d15baa (adding all previous work)
		const connection = await new MySQLService().connect();
		const sql = `
	UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
	SET ${this.table}.status_id=:status_id 
	WHERE ${this.table}.task_id=:task_id;
	`;
		//the order of the variables must be identical to the order in table in SQL
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
<<<<<<< HEAD
			const UpdatedTask = await new TaskRepo().selectOne({
				task_id: data.task_id,
			});

			return UpdatedTask;
=======
			console.log(query);
			//get the first element

			return query;
>>>>>>> 6d15baa (adding all previous work)
		} catch (error) {
			return error;
		}
	};

	//the difference between insert and insertTransaction is that insertTransaction require that the 2 sql are done togetther if one
	//fails the other fails and an error occur
	//so when the client create a task he must select machine_ids for this task so new rows will be added to the table of jointure
	//because the logic is to create a task for machines not just tasks
	public insertTransaction = async (
		data: Partial<Task>, // one or many machines
<<<<<<< HEAD
	): Promise<Task | unknown> => {
=======
	): Promise<QueryResult> => {
>>>>>>> 6d15baa (adding all previous work)
		const connection = await new MySQLService().connect();

		try {
			await connection.beginTransaction();

			// 1️⃣ Insert task
			const taskSql = `
            INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
            (
				
				task_id,
                created_by,
                description,
                priority_id,
                deadline,
                status_id,
                title,
                assigned_to
            )
            VALUES (
				NULL,
                :created_by,
                :description,
                :priority_id,
                :deadline,
                :status_id,
                :title,
                :assigned_to
            );
        `;

			const [taskResult] = await connection.execute(taskSql, data);
			const taskId = (taskResult as any).insertId; //to get the last inserted id

<<<<<<< HEAD
			// 2️⃣ Insert into machine_task and block the machines on which there is a task
=======
			// 2️⃣ Insert into machine_task
>>>>>>> 6d15baa (adding all previous work)
			const machineSql = `
            INSERT INTO machine_task (task_id, machine_id)
            VALUES (?, ?);
        `;

			for (const machineId of data.machine_ids as any) {
				//data.machine_ids is the machine_ids sent in json to the backend since there is machine_ids in Task type
				await connection.execute(machineSql, [taskId, machineId]); //[taskId, machineId] will replace the ?  in VALUES (?, ?)
			}

			// 3️⃣ Commit if everything succeeded
			await connection.commit();

<<<<<<< HEAD
			//get the new created task to send it to the front end using web sockets
			const newTask = await new TaskRepo().selectOne({ task_id: taskId });

			return newTask;
=======
			return taskResult;
>>>>>>> 6d15baa (adding all previous work)
		} catch (error) {
			// 4️⃣ Rollback on any error
			await connection.rollback();
			throw error;
		}
	};

	public deleteTransaction = async (
		data: Partial<Task>, // one or many machines
<<<<<<< HEAD
	): Promise<Partial<Task>> => {
=======
	): Promise<QueryResult> => {
>>>>>>> 6d15baa (adding all previous work)
		const connection = await new MySQLService().connect();
		// we must first start by deleteting the rows of the table de jointure because there is a foreign key constraint
		try {
			await connection.beginTransaction();
<<<<<<< HEAD
			const deletedTask: Task = (await new TaskRepo().selectOne({
				task_id: data.task_id,
			})) as Task;

			const commentSql = `
            DELETE FROM comment 
			WHERE task_id=:task_id;
            
        `;
			await connection.execute(commentSql, data);
=======
>>>>>>> 6d15baa (adding all previous work)

			const machineSql = `
            DELETE FROM machine_task 
			WHERE task_id=:task_id;
            
        `;

<<<<<<< HEAD
			await connection.execute(machineSql, data);
=======
			const [taskResult] = await connection.execute(machineSql, data);
>>>>>>> 6d15baa (adding all previous work)

			const taskSql = `
            DELETE FROM ${process.env.MYSQL_DATABASE}.${this.table} 
            WHERE task_id = :task_id;
        `;

			await connection.execute(taskSql, data);

			// 3️⃣ Commit if everything succeeded
			await connection.commit();

<<<<<<< HEAD
			return deletedTask;
=======
			return taskResult;
>>>>>>> 6d15baa (adding all previous work)
		} catch (error) {
			// 4️⃣ Rollback on any error
			await connection.rollback();
			throw error;
		}
	};
}
export default TaskRepo;

/*This is the query that will add machine_ids to tasks so each row will contain task title and list of ids of machines */
/*
SELECT ${this.table}.*
FROM ${process.env.MYSQL_DATABASE}.${this.table};
*/
/*
SELECT   ${this.table}.title,   GROUP_CONCAT(machine.machine_id) AS machine_ids FROM ${this.table} 
		LEFT JOIN machine_task  ON ${this.table}.task_id = machine_task.task_id 
		LEFT JOIN machine ON machine.machine_id = machine_task.machine_id 
		GROUP BY ${this.table}.task_id;
*/
