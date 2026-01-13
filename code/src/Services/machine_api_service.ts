import type { Machine } from "../../models/machine";
import type { ApiResponse } from "../models/api_response";

class MachineAPI_Service {
	//prefix of the api
	private prefix = "/api/machine";

	//the function used to select all machines like in repo and controllers
	public selectAll = async (): Promise<ApiResponse<Machine[]>> => {
		//the promise return an ApiResponse which return an array of machines as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
		); //import an environmen tvariable in vite react
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)
		return results;
	};

	public create = async (
		machine: Omit<
			Machine,
			"machine_id" | "last_maintenance" | "status" | "location"
		>,
	): Promise<ApiResponse<Machine>> => {
		//the promise return an ApiResponse which return an array of machines as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(machine),
			},
		); //import an environmen tvariable in vite react
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)
		return results;
	};

	public delete = async (
		machine: Partial<Machine | undefined>,
	): Promise<ApiResponse<Machine[]>> => {
		//the promise return an ApiResponse which return an array of machines as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(machine),
			},
		); //import an environmen tvariable in vite react
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)
		return results;
	};
}
export default MachineAPI_Service;
