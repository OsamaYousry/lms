/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';

const app = express();

type Course = {
  title: string;
  description: string;
  schedule: string;
};

const courses: Course[] = [
  {title: 'Course 1', description: 'Description 1', schedule: 'Schedule 1'},
  {title: 'Course 2', description: 'Description 2', schedule: 'Schedule 2'},
  {title: 'Course 3', description: 'Description 3', schedule: 'Schedule 3'},
];

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
