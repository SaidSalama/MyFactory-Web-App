SELECT sensor.name AS SENSOR ,machine.name AS MACHINE ,sensor_type.name AS TYPE ,sensor.value AS VALUE 
FROM sensor INNER JOIN machine ON sensor.machine_id=machine.machine_id
INNER JOIN sensor_type ON sensor.sensortype_id=sensor_type.sensortype_id; 