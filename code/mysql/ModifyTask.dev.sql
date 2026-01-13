use FactoryData;

/*ALTER TABLE task DROP FOREIGN KEY task_ibfk_1;  -- delete the foreign key for user
ALTER TABLE task DROP COLUMN user_id;           -- delete the column of user*/


/*ALTER TABLE task 
ADD COLUMN created_By TINYINT NOT NULL,
ADD COLUMN assigned_To TINYINT NOT NULL;


ALTER TABLE task
ADD CONSTRAINT fk_task_created_by
  FOREIGN KEY (created_By) REFERENCES users(user_id),
ADD CONSTRAINT fk_task_assigned_to
  FOREIGN KEY (assigned_To) REFERENCES users(user_id);*/

/*ALTER TABLE task
ADD CONSTRAINT check_valid_status
CHECK (task.status_id<4);*/


