SELECT task.title as TASK_TILTLE,comment.value as COMMENT 
from task left join comment
on task.task_id=comment.task_id;