import type { Role } from "./role";

type Users = {
	user_id: number;
	username: string;
	password?: string; //optional because we don't need to read it in front end but we need to add it
	email: string;
	role_id: number;
	role: Role;
};
export type { Users };
