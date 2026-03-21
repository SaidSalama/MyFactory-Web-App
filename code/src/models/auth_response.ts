import type { Users } from "../../models/users";

export interface LoginResponseData {
	token?: string; //  JWT token
	user: Users; // User object without password
}

export interface AuthResponse {
	status: number;
	message: string;
	data?: LoginResponseData;
}
