import type { Demand } from "../../models/demand";
import type { ApiResponse } from "../models/api_response";

class DemandAPI_Service {
	//prefix of the api
	private prefix = "/api/Demand";

	//the function used to select all machines like in repo and controllers
	public selectAll = async (): Promise<ApiResponse<Demand[]>> => {
		//the promise return an ApiResponse which return an array of machines as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
		); //import an environmen tvariable in vite react
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)
		return results;
	};

	public delete = async (
		demand: Partial<Demand | undefined>,
	): Promise<ApiResponse<Demand[]>> => {
		//the promise return an ApiResponse which return an array of machines as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(demand),
			},
		); //import an environmen tvariable in vite react
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)
		return results;
	};

	public create = async (
		demand: Partial<Demand | undefined>,
	): Promise<ApiResponse<Demand[]>> => {
		//the promise return an ApiResponse which return an array of machines as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(demand),
			},
		); //import an environmen tvariable in vite react
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)
		return results;
	};
	public complete = async (
		demand: Partial<Demand | undefined>,
	): Promise<ApiResponse<Demand[]>> => {
		//the promise return an ApiResponse which return an array of machines as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}/${demand?.demand_id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(demand),
			},
		); //import an environmen tvariable in vite react
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)

		return results;
	};
}
export default DemandAPI_Service;
