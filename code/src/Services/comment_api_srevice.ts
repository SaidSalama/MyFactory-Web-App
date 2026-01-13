import type { Comment } from "../../models/comment";
import type { Task } from "../../models/task";
import type { ApiResponse } from "../models/api_response";

class CommentAPI_Service {
	private prefix = "/api/taskcomment";
	public create = async (
		comment: Partial<Comment | undefined>,
	): Promise<ApiResponse<Comment[]>> => {
		//the promise return an ApiResponse which return an array of machines as data
		//configure HTTP query
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(comment),
			},
		); //import an environmen tvariable in vite react
		const response = await fetch(request); //execute query
		const results = await response.json(); //GET THE Result(string) AND CONVERT IT TO JSON (Deserialiser)
		return results;
	};
}
export default CommentAPI_Service;
