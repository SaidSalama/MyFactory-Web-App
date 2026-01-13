import type { Role } from "./role";

type Users = {
    user_id: number;
    username: string;
    password: string;
    email: string;
    role_id: number;
    role: Role;
}
export type { Users };