SELECT   task.*,   GROUP_CONCAT(machine.machine_id) AS machine_ids FROM task 
JOIN machine_task  ON task.task_id = machine_task.task_id 
JOIN machine ON machine.machine_id = machine_task.machine_id 
GROUP BY task.task_id;