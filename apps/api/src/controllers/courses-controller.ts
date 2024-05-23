import {Router} from "express";
import {addCourseSchema, CourseDTO} from "@lms/data";
import coursesService from "../services/courses-service";


const coursesController = Router();

coursesController.get('/courses', async (req, res) => {
  const page: number = parseInt(req.query.page as string) || 0;
  const paginatedCourses = await coursesService.getCourses(page);
  res.send(paginatedCourses);
});

coursesController.post('/courses', (req, res) => {
  addCourseSchema.validate(req.body, {abortEarly: false}).then(() => {
    coursesService.addCourse(req.body).then((created) => {
      res.send(created);
    });
  }).catch((err) => {
    res.status(400).send(err.errors);
  });
});

coursesController.delete('/courses/:id', (req, res) => {
  const title = req.params.id;
  coursesService.deleteCourse(title).then((result) => {
    res.send(result);
  }, (err) => {
    res.status(404).send(err);
  });
});

coursesController.put('/courses/:id', (req, res) => {
  const course = req.body as CourseDTO;
  addCourseSchema.validate(course, {abortEarly: false}).then(() => {
    coursesService.editCourse(course).then((updated) => {
      res.send(updated);
    }, (err) => {
      res.status(404).send(err);
    });
  });
});

coursesController.get('/courses/:id', (req, res) => {
  const title = req.params.id;
  coursesService.getCourseDetails(title).then((course) => {
    res.send(course);
  }, (err) => {
    res.status(404).send(err);
  });
});

coursesController.post('/courses/:id/students', async (req, res) => {
  const course = req.params.id;
  const student = req.body.student;
  const students = await coursesService.addStudent(course, student);
  res.send(students);
});

coursesController.delete('/courses/:id/students/:student', async (req, res) => {
  const course = req.params.id;
  const student = req.params.student;
  const students = await coursesService.deleteStudent(course, student);
  res.send(students);
});

export default coursesController;
