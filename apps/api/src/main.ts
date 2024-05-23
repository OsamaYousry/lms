import express from 'express';
import {CourseDTO, PaginatedDTO} from "@lms/data";

const app = express();



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

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
