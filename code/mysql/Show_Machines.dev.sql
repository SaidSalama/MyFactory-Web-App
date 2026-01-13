-- Get evry machines location
SELECT machine.name AS MACHINE , location.name AS LOCATION 
FROM machine INNER JOIN location 
ON machine.location_id=location.location_id;

-- Get evry machines status
SELECT machine.name AS MACHINE , status.value AS STATUS 
FROM machine INNER JOIN status 
ON machine.status_id=status.status_id;

-- Get evry machines effeciency
SELECT machine.name AS MACHINE , machine.efficency AS EFFICENCY 
FROM machine  ;

-- Get evry machines last maintenance
SELECT machine.name AS MACHINE , machine.last_maintenance AS LAST_MAINTENANCE 
FROM machine  ;
