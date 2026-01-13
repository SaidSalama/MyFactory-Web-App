SELECT task.title AS TITLE ,status.value AS STATUS ,creator.username AS CREATED_BY ,assignee.username AS ASSIGNED_TO
FROM task INNER JOIN status ON task.status_id = status.status_id
INNER JOIN users AS creator ON task.created_by=creator.user_id
INNER JOIN users AS assignee ON task.assigned_to=assignee.user_id;