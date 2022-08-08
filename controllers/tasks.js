import Task from "../models/task.js";
import { v4 as uuid } from 'uuid';

export default class TasksController {
    static async getTasks(req, res) {
        const { uid } = req.params;

        Task
            .find({ uid })
            .then((results) => {
                res.status(200).json({
                    success: true,
                    results
                });
            })
            .catch(() => {
                res.status(500).json({
                    success: false
                });
            });
    }

    static async addTask(req, res) {
        const { title, uid } = req.body;
        const taskId = uuid();

        Task
            .create({
                taskId,
                title,
                uid,
                completed: false,
            })
            .then(async () => {
                const results = await Task.find({ uid });

                res.status(200).json({
                    success: true,
                    results,
                });
            })
            .catch(() => {
                res.status(500).json({
                    success: false,
                });
            });
    }
    
    static async completeTask(req, res) {
        const { taskId } = req.params;
        const { uid } = req.body;

        Task
            .findOne({ taskId })
            .then(async (result) => {
                await Task.updateOne({ taskId }, {$set: { completed: !result.completed }})
            })
            .then(async () => {
                const results = await Task.find({ uid });

                res.status(200).json({
                    success: true,
                    results
                });
            })
            .catch(() => {
                res.status(500).json({
                    success: false,
                });
            });
    }
    
    static async deleteTask(req, res) {
        const { taskId } = req.params;
        const { uid } = req.body;

        Task
            .findOneAndRemove({ taskId })
            .then(async () => {
                const results = await Task.find({ uid });

                res.status(200).json({
                    success: true,
                    results,
                });
            })
            .catch(() => {
                res.status(500).json({
                    success: false,
                });
            });
    }
}