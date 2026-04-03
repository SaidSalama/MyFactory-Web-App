import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import CommentRepo from "../../../Server/repositories/commentRepo";
import MySQLService from "../../../Server/services/mysql_service";

describe("CommentRepo", () => {
	let connection: any;
	let commentRepo: CommentRepo;

	beforeAll(async () => {
		const mysqlService = new MySQLService();
		connection = await mysqlService.connect();

		// Add this line to select the database
		await connection.query("USE FactoryData_test");

		commentRepo = new CommentRepo();
	});

	afterAll(async () => {
		// Close connection after all tests
		if (connection) {
			await connection.release();
		}
	}, 10000); // 10 second timeout

	beforeEach(async () => {
		// Clean database in correct order (child tables first)
		await connection.execute("DELETE FROM comment");
		await connection.execute("DELETE FROM task");
		await connection.execute("DELETE FROM users");
		await connection.execute("DELETE FROM priority");
		await connection.execute("DELETE FROM status");
		await connection.execute("DELETE FROM role");

		// Insert role
		await connection.execute(
			"INSERT INTO role (role_id, name) VALUES (1, 'admin')",
		);

		// Insert priority
		await connection.execute(
			"INSERT INTO priority (priority_id, value) VALUES (1, 'High')",
		);

		// Insert status
		await connection.execute(
			"INSERT INTO status (status_id, value) VALUES (1, 'Open')",
		);

		// Insert user
		await connection.execute(
			"INSERT INTO users (user_id, username, password, email, role_id) VALUES (1, 'testuser', 'password123', 'test@test.com', 1)",
		);

		// Insert a test task with all required fields
		await connection.execute(
			`INSERT INTO task (
				task_id, 
				created_by, 
				description, 
				priority_id, 
				deadline, 
				status_id, 
				title
			) VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[1, 1, "Test description", 1, "2025-12-31 23:59:59", 1, "Test Task"],
		);
	});

	describe("CreateTaskComment", () => {
		it("should create comment and return task with comments", async () => {
			// Arrange
			const commentData = {
				task_id: 1,
				value: "Great work!",
			};

			// Act
			const result = await commentRepo.CreateTaskComment(commentData);

			// Assert
			expect(result).not.toBeInstanceOf(Error);
			expect(result).toHaveProperty("task_id", 1);
			expect(result).toHaveProperty("comments");
			expect(Array.isArray(result.comments)).toBe(true);

			// Check comment was added
			const comments = result.comments;
			const newComment = comments.find((c: any) => c.value === "Great work!");
			expect(newComment).toBeDefined();
			expect(newComment.task_id).toBe(1);
		});
	});
});
