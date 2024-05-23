import express from 'express';
import {addCourseSchema, CourseDTO, PaginatedDTO} from "@lms/data";
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());



const courses: CourseDTO[] = [
  {title: 'Course 1', description: 'Description 1', schedule: [
    {day: 1, startTime: '09:00', endTime: '12:00'},
    {day: 2, startTime: '09:00', endTime: '12:00'}
  ]},
  {title: 'Course 2', description: 'Description 2', schedule: [
    {day: 3, startTime: '09:00', endTime: '12:00'},
    {day: 4, startTime: '09:00', endTime: '12:00'}
  ]},
  {title: 'Course 3', description: 'Description 3', schedule: [
    {day: 5, startTime: '09:00', endTime: '12:00'},
    {day: 6, startTime: '09:00', endTime: '12:00'}
  ]}
];

app.get('/api/courses', (req, res) => {
  const page = req.query.page || 0;
  const paginatedCourse: PaginatedDTO<CourseDTO> = {
    data: courses,
    page: parseInt(page as string, 10),
    total: 20,
    pageSize: 10
  };
  res.send(paginatedCourse);
});

app.post('/api/courses', (req, res) => {
  addCourseSchema.validate(req.body, {abortEarly: false}).then(() => {
    courses.push(req.body);
    res.send(req.body);
  }).catch((err) => {
    res.status(400).send(err.errors);
  });
});

app.delete('/api/courses/:id', (req, res) => {
  const index = courses.findIndex((course) => course.title === req.params.id);
  if (index === -1) {
    res.status(404).send('Course not found');
  } else {
    courses.splice(index, 1);
    res.send('Course deleted');
  }
});

app.put('/api/courses/:id', (req, res) => {
  const course = req.body as CourseDTO;
  addCourseSchema.validate(course, {abortEarly: false}).then(() => {
    const index = courses.findIndex((c) => c.title === req.params.id);
    if (index === -1) {
      res.status(404).send('Course not found');
    } else {
      courses[index] = req.body;
      res.send('Course updated');
    }
  });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
