import auth from './auth.js';
import tasks from './tasks.js';

export default function (baseURL, app) {
    app.use(baseURL + '/auth', auth);
    app.use(baseURL + '/tasks', tasks);
}