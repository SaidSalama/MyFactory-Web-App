import type { Role } from "../../models/role";
import type { Users } from "../../models/users";
import MySQLService from "../services/mysql_service";
import RoleRepo from "./role_repo";


class UsersRepo {
	private table = "users";
	public selectAll = async (): Promise<Users[] | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		const sql = `
        SELECT ${this.table}.user_id,${this.table}.username,${this.table}.role_id
        FROM ${process.env.MYSQL_DATABASE}.${this.table};

        `;
		//execute the query
		try {
			const [query] = await connection.execute(sql);
			console.log(query);
			for (let i = 0; i < (query as Users[]).length; i++) {
				const result = (query as Users[])[i] as Users;
				console.log(result);
				result.role = (await new RoleRepo().selectOne({ role_id: result.role_id })) as Role;
				
			}
			return query;
		} catch (error) {
			return error;
		}
	};
	public selectOne = async (
		data: Partial<Users>,
	): Promise<Users | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:status_id means  qeury variable
		const sql = `
        SELECT ${this.table}.user_id,${this.table}.username,${this.table}.role_id
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE ${this.table}.user_id= :user_id ;

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			const result = (query as Users[]).shift();

			return result;
		} catch (error) {
			return error;
		}
	};
	public inserUser = async (
		data: Partial<Users>,
	): Promise<Users | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:status_id means  qeury variable
		const sql = `
        INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
		 
        VALUES (
			NULL,
			:username,
			:password,
			:email,
			:role_id
		);

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			//const result = (query as Users[]).shift();

			return query;
		} catch (error) {
			return error;
		}
	};

	public deleteUser = async (
		data: Partial<Users>,
	): Promise<Users | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:status_id means  qeury variable
		const sql = `
        DELETE FROM ${process.env.MYSQL_DATABASE}.${this.table}
		WHERE ${this.table}.user_id=:user_id
       ;

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			console.log(query);
			//get the first element
			//const result = (query as Users[]).shift();

			return query;
		} catch (error) {
			return error;
		}
	};


	
}
export default UsersRepo;
/* */