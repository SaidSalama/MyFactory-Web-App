

CREATE TRIGGER CHECK_DEMAND_CREATOR  -- the name of the trigger
BEFORE INSERT ON demand  -- this code will be executed whenever an insert operation is done on table demand
FOR EACH ROW
BEGIN
    DECLARE demand_creator_role TINYINT; -- DECLARE a variable named demand_creator_role
    SELECT users.role_id INTO demand_creator_role   -- this variable is assigned to role_id column of table users
    FROM users 
    WHERE users.user_id = NEW.created_by;  -- check that the user that created the demand exists in users table

    IF demand_creator_role IS NULL OR demand_creator_role <> 3  -- if the role_id is not 3 then raise an error
    THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Creator must be an buisness owner (role_id = 3)';
    END IF;
END;



