import type { Demand } from "../../models/demand";
import type { Status } from "../../models/status";
import type { Users } from "../../models/users";
import MySQLService from "../services/mysql_service";
import StatusRepo from "./status_repo";
import UsersRepo from "./users_repo";

class DemandRepo {
	private table = "demand";
	public selectAll = async (): Promise<Demand[] | unknown> => {
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
			for (let i = 0; i < (query as Demand[]).length; i++) {
				const result = (query as Demand[])[i] as Demand;
				console.log(result);
				result.creator = (await new UsersRepo().selectOne({
					user_id: result.created_by,
				})) as Users;
				result.status = (await new StatusRepo().selectOne({
					status_id: result.status_id,
				})) as Status;
			}
			return query;
		} catch (error) {
			return error;
		}
	};
	public selectOne = async (
		data: Partial<Demand>,
	): Promise<Demand | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:status_id means  qeury variable
		const sql = `
        SELECT ${this.table}.*
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE ${this.table}.demand_id= :demand_id; 

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			const result = (query as Demand[]).shift();

			return result;
		} catch (error) {
			return error;
		}
	};

	public markDemand_completed = async (
		data: Partial<Demand>,
	): Promise<Demand | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
        UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
		SET ${this.table}.status_id =7  
		WHERE  ${this.table}.demand_id=:demand_id 
         ;

        `;
		try {
			const [query] = await connection.execute(sql, data);
			return query;
		} catch (error) {
			return error;
		}
	};

	public insert_Deamand = async (
		data: Partial<Demand>,
	): Promise<Demand | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
		INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
		(demand_id , title , description , deadline , created_by , status_id)
		VALUES 
		(
		NULL,
		:title,
		:description,
		:deadline,
		6,  
		1
		)
         ;

        `;
		//in the query i made created_by=6 so it is the director  !! modify it after making connection
		try {
			const [query] = await connection.execute(sql, data);
			return query;
		} catch (error) {
			return error;
		}
	};
	public delete_Demand = async (
		data: Partial<Demand>,
	): Promise<Demand | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
		DELETE FROM ${process.env.MYSQL_DATABASE}.${this.table}
		WHERE demand_id=:demand_id
         ;

        `;
		try {
			const [query] = await connection.execute(sql, data);
			return query;
		} catch (error) {
			return error;
		}
	};
}
export default DemandRepo;
/* */
