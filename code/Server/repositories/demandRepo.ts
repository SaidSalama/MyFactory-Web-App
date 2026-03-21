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
<<<<<<< HEAD
			const result = (query as Demand[]).shift() as Demand;
			result.creator = (await new UsersRepo().selectOne({
					user_id: result.created_by,
				})) as Users;
				result.status = (await new StatusRepo().selectOne({
					status_id: result.status_id,
				})) as Status;
=======
			const result = (query as Demand[]).shift();
>>>>>>> 6d15baa (adding all previous work)

			return result;
		} catch (error) {
			return error;
		}
	};
<<<<<<< HEAD
	// making the status_id of the demand =7 means it is completed
=======

>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
			const updatedDemand = await new DemandRepo().selectOne({ demand_id: data.demand_id });
			return updatedDemand;
=======
			return query;
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
		:created_by,  
=======
		6,  
>>>>>>> 6d15baa (adding all previous work)
		1
		)
         ;

        `;
		//in the query i made created_by=6 so it is the director  !! modify it after making connection
		try {
			const [query] = await connection.execute(sql, data);
<<<<<<< HEAD
			const demandID = (query as any).insertId; //to get the last inserted id
			const newDemand=await new DemandRepo().selectOne({ demand_id: demandID });
			return newDemand;
=======
			return query;
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
			const deletedDemand = await new DemandRepo().selectOne({ demand_id: data.demand_id });
			const [query] = await connection.execute(sql, data);
			return deletedDemand;
=======
			const [query] = await connection.execute(sql, data);
			return query;
>>>>>>> 6d15baa (adding all previous work)
		} catch (error) {
			return error;
		}
	};
}
export default DemandRepo;
/* */
