import coursesModel from "../models/courses-model";
import {CourseDTO, PaginatedDTO} from "@lms/data";
import studentsModel from "../models/students.model";

class CoursesService {
  async getCourses(page: number): Promise<PaginatedDTO<CourseDTO>> {
    const courses = await coursesModel.getCourses(page);

    return {
      data: courses,
      page: page,
      total: 20,
      pageSize: 10
    };
  }

  async addCourse(course: CourseDTO): Promise<CourseDTO> {
    return coursesModel.addCourse(course);
  }

  async editCourse(course: CourseDTO): Promise<CourseDTO> {
    return coursesModel.editCourse(course);
  }

  async deleteCourse(title: string): Promise<string> {
    return coursesModel.deleteCourse(title);
  }

  async getCourseDetails(title: string): Promise<CourseDTO> {
    const course = await coursesModel.getCourse(title);
    const students = await studentsModel.getStudents(title);

    course.students = students;
    return course;
  }

  async addStudent(course: string, student: string) {
    return studentsModel.addStudent(course, student);
  }

  async deleteStudent(course: string, student: string) {
    return studentsModel.deleteStudent(course, student);
  }
}

export default new CoursesService();
