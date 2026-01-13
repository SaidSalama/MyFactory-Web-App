import type { Comment } from "./comment";
import type { Machine } from "./machine";
import type { Priority } from "./priority";
import type { Status } from "./status";
import type { Users } from "./users";

type Task = {
	task_id: number;
	created_by: number;
	description: string;
	priority_id: number;
	deadline: Date | string | null;
	status_id: number;
	assigned_to: number;
	title: string;

	//foreign keys
	creator: Users;
	priority: Priority;
	status: Status;
	assignee: Users;

	// the list of machines on which there is the task
	machine_ids: string;
	machines: Machine[];

	//task is a foreign key for comment but we need to get the comments from the tasks
	comments: Comment[];
};
export type { Task };
