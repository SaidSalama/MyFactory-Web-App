import type { Users } from "../../models/users";
import type { ApiResponse } from "../models/api_response";

class UsersAPI_Service {
	//prefix of the api
	private prefix = "/api/users";

	//the function used to select all users like in repo and controllers
	public selectAll = async (): Promise<ApiResponse<Users[]>> => {
		//the promise return an ApiResponse which return an array of users as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,//import an environmen tvariable in vite react
			{
				method:"GET",
			}
		); 
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)
		return results;
	};

	public delete = async (user:Partial<Users>): Promise<ApiResponse<Users[]>> => {
		//the promise return an ApiResponse which return an array of users as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,//import an environmen tvariable in vite react
			{
				method: "DELETE",
				headers: {
    				"Content-Type": "application/json",
  						},
				body:JSON.stringify(user),
			}
		); 
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)
		return results;
	};

	public create = async (user: Omit<Users, "user_id" | "role">): Promise<ApiResponse<Users>> => {
		//user is a parameter of type Users but witout "user_id" and "role" attributes
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,//import an environmen tvariable in vite react
			{
				method: "POST",
				headers: {
    				"Content-Type": "application/json",
  						},
				body: JSON.stringify(user),
			}
		);
		const response = await fetch(request);
		const results = await response.json();
		
		return results;
	}
}
export default UsersAPI_Service;
