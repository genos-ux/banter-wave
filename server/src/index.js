import express from 'express';
import routes from './routes/index.routes.js';

const app = express();


app.use("/api/v1", routes);


app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
})