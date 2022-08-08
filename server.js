import express from 'express';
import Mongoose from 'mongoose';
import { PORT, databaseURL } from './config.js'
import routes from './routes/index.js';
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json());

app.get(
    '/',
    (req, res) => {
        res.status(200).json('Server Running ...');
    }
);

// init routes
routes('/api', app);

Mongoose
    .connect(databaseURL)
    .then(() => console.log('Connected to MongoDB Successfully.'))
    .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${PORT} ...`);
});