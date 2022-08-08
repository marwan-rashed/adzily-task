import Mongoose from 'mongoose';

const taskSchema = new Mongoose.Schema({
    taskId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    }
});

const Task = Mongoose.model('Task', taskSchema);

export default Task;