import express from 'express';
import Mongoose from 'mongoose';
import { PORT, databaseURL } from './config.js'
import routes from './routes/index.js';

const app = express()

app.use(express.json());

// init routes
routes('/api', app);

Mongoose
    .connect(databaseURL)
    .then(() => console.log('Connected to MongoDB Successfully.'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} ...`);
});