import type { Coils } from "../../models/coils";
import type { Holding_Reg } from "../../models/holding_register";
import type { ApiResponse } from "../models/api_response";

class PLC_API_Service {
	private prefix = "/api/PLC";
	private prefix_c="/api/PLC/coil"
	public send = async (data: Holding_Reg): Promise<ApiResponse<Holding_Reg>> => {
		//the promise return an ApiResponse which return an array of machines as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			},
		); //import an environmen tvariable in vite react
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)
		return results;
	};

		public writecoil = async (data:Coils): Promise<ApiResponse<Coils>> => {
		//the promise return an ApiResponse which return an array of machines as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix_c}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			},
		); //import an environmen tvariable in vite react
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)
		return results;
	};
}
export default PLC_API_Service;
