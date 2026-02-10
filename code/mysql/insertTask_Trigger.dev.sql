-- This trigger was dropped to allow directors to create tasks

CREATE TRIGGER check_task_roles
BEFORE INSERT ON task 
FOR EACH ROW
BEGIN
  DECLARE creator_role TINYINT;
  DECLARE assignee_role TINYINT;

  SELECT role_id INTO creator_role
  FROM users
  WHERE user_id = NEW.created_By;

  SELECT role_id INTO assignee_role
  FROM users
  WHERE user_id = NEW.assigned_To;

  IF creator_role <> 1 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Creator must be an engineer (role_id = 1)';
  END IF;

  IF assignee_role <> 2 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Assignee must be a technician (role_id = 2)';
  END IF;
END;


