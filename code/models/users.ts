import type { Role } from "./role";

type Users = {
    user_id: number;
    username: string;
<<<<<<< HEAD
    password?: string; //optional because we don't need to read it in front end but we need to add it 
=======
    password: string;
>>>>>>> 6d15baa (adding all previous work)
    email: string;
    role_id: number;
    role: Role;
}
export type { Users };