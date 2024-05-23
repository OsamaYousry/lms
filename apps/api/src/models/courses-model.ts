import {CourseDTO} from "@lms/data";

class CoursesModel {
  private courses: CourseDTO[];
  constructor() {
    this.courses = [
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
  }

  async getCourses(page: number) {
    return this.courses;
  }

  async addCourse(course: CourseDTO) {
    this.courses.push(course);
    return course;
  }

  async editCourse(course: CourseDTO) {
    const index = this.courses.findIndex((c) => c.title === course.title);
    if (index === -1) {
      throw new Error('Course not found');
    }
    this.courses[index] = course;
    return course;
  }

  async deleteCourse(title: string) {
    const index = this.courses.findIndex((c) => c.title === title);
    if (index === -1) {
      throw new Error('Course not found');
    }
    this.courses.splice(index, 1);
    return 'Course deleted';
  }

  async getCourse(title: string) {
    const course = this.courses.find((c) => c.title === title);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  }

}

export default new CoursesModel();
