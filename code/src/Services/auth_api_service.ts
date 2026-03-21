import type { Users } from "../../models/users";
//import type { ApiResponse } from "../models/api_response";
import type { AuthResponse } from "../models/auth_response";
class AuthAPI_Service {
	//prefix of the api
	private prefix = "/api/Login";

	public login = async (user: Partial<Users>): Promise<AuthResponse> => {
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
export default AuthAPI_Service;
