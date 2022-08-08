import express from 'express';
import TasksController from '../controllers/tasks.js';

const router = express();

router.get(
    '/:uid',
    TasksController.getTasks,
);

router.post(
    '/',
    TasksController.addTask,
);

router.put(
    '/:taskId',
    TasksController.completeTask,
);

router.delete(
    '/:taskId',
    TasksController.deleteTask,
);

export default router;