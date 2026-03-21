import type { Sensor } from "../../models/sensor";
import type { ApiResponse } from "../models/api_response";

class SensorAPI_Service {
	//prefix of the api
	private prefix = "/api/sensor";

	//the function used to select all machines like in repo and controllers
	public selectAll = async (): Promise<ApiResponse<Sensor[]>> => {
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
		sensor: Partial<Sensor | undefined>,
	): Promise<ApiResponse<Sensor[]>> => {
		//the promise return an ApiResponse which return an array of machines as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(sensor),
			},
		); //import an environmen tvariable in vite react
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)
		return results;
	};

	public create = async (
		sensor: Partial<Sensor | undefined>,
	): Promise<ApiResponse<Sensor[]>> => {
		//the promise return an ApiResponse which return an array of machines as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(sensor),
			},
		); //import an environmen tvariable in vite react
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)
		return results;
	};
}
export default SensorAPI_Service;
