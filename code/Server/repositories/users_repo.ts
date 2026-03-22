import type { Role } from "../../models/role";
import type { Users } from "../../models/users";
import MySQLService from "../services/mysql_service";
import passwordService from "../services/Password_service";
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
			//console.log(query);
			for (let i = 0; i < (query as Users[]).length; i++) {
				const result = (query as Users[])[i] as Users;
				//console.log(result);
				result.role = (await new RoleRepo().selectOne({
					role_id: result.role_id,
				})) as Role;
				//delete the password because it is very dangerous to return it to the client
				//but here we don't need to delete it because it is not in the select query
				//delete result.password;
			}
			return query;
		} catch (error) {
			return error;
		}
	};
	public selectOne = async (data: Partial<Users>): Promise<Users | unknown> => {
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
			const result = (query as Users[]).shift() as Users;
			result.role = (await new RoleRepo().selectOne({
				role_id: result.role_id,
			})) as Role;
			//delete the password because it is very dangerous to return it to the client
			//but here we don't need to delete it because it is not in the select query
			//delete result.password;
			return result;
		} catch (error) {
			return error;
		}
	};
	public inserUser = async (data: Partial<Users>): Promise<Users | unknown> => {
		//first we need to hash the password before storing in database
		const hashedPassword = await passwordService.hashPassword(
			data.password as string,
		);
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
			//we need to apply the hashed password to the data before sending to database
			const userData = {
				...data,
				password: hashedPassword,
			};
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, userData); //userData is the data containing hashed password
			console.log(query);
			//get the id of the new user
			const NewuserId = (query as any).insertId;
			const Newuser = await new UsersRepo().selectOne({ user_id: NewuserId });

			return Newuser; //return the new created user to send to the client from the controller
		} catch (error) {
			return error;
		}
	};

	public deleteUser = async (
		data: Partial<Users>,
	): Promise<Users | unknown> => {
		//get the deletd user before delete
		const deleteduser = (await new UsersRepo().selectOne({
			user_id: data.user_id,
		})) as Users;
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

			return deleteduser;
		} catch (error) {
			return error;
		}
	};
	public FindByMail = async (
		data: Partial<Users>,
	): Promise<Users | unknown> => {
		//connection to mysql server
		const connection = await new MySQLService().connect();
		//:status_id means  qeury variable
		const sql = `
        SELECT *
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE ${this.table}.email= :email
		AND ${this.table}.role_id=:role_id;
		

        `;
		//execute the query
		try {
			//data parameter is used to store any variables of the query
			//using variables in queries ensure security search for 'prepared statement'
			const [query] = await connection.execute(sql, data);
			//get the first element
			const result = (query as Users[]).shift() as Users;
			//if the mail is not in database return null to avoid internal sdrver error and send another warning
			if (!result) {
				return null; // Or throw an error
			}
			result.role = (await new RoleRepo().selectOne({
				role_id: result.role_id,
			})) as Role;

			return result;
		} catch (error) {
			return error;
		}
	};
}
export default UsersRepo;
/* */
