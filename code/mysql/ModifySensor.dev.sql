USE FactoryData;
/*ALTER TABLE sensor MODIFY value CHECK (
    (sensortype_id = 1 AND value IN (0, 1))        -- Digital: only 0 or 1
    OR
    (sensortype_id = 2 AND value IS NOT NULL)      -- Analog: any decimal(10,2)
);*/

-- this will not work because we can't put a CHECK constraint with MODIFY

/*ALTER TABLE sensor
ADD CONSTRAINT IF NOT EXISTS chk_sensor_value --IF NOT EXISTS is used to avoid adding the contraints when we rerun the script
CHECK (
    (sensortype_id = 1 AND value IN (0, 1))          -- Digital → only 0 or 1
    OR
    (sensortype_id = 2 AND value IS NOT NULL)        -- Analog → any decimal
);
*/

-- hERE WE ADD A CONSTRAINT TO THE WHOLE Table

-- adding a new foreign key but we must add the coloumn first
/*ALTER TABLE sensor
ADD COLUMN IF NOT EXISTS  machine_id TINYINT NULL AFTER value; -- AFTER value means after the coloumn 'value'
ALTER TABLE sensor
ADD CONSTRAINT  IF NOT EXISTS fk_machine_id FOREIGN KEY (machine_id) REFERENCES machine(machine_id);*/

 -- alter table sensor add column functionality varchar(20) after sensor_id;  
