-- 1. Remove old sensor_id from machine
-- we need first to remove the constraint of the foreign key so we can drop the colomn
-- but when adding a new foreign key we need to add the colomn first then the foreign key



/*ALTER TABLE machine DROP FOREIGN KEY machine_ibfk_3;   --machine_ibfk_3 is the name qiven by mysql to the constarint of the foreign key
                                                       --to know it run SHOW CREATE TABLE machine;
ALTER TABLE machine DROP COLUMN sensor_id;*/