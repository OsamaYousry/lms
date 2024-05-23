import express from 'express';
import coursesController from "./controllers/courses-controller";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());




app.use('/api', coursesController);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
