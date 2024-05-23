import {CourseDTO} from "@lms/data";

class API {
  async fetchCourses(page = 0) {
    const res = await fetch('/api/courses?page=' + page);
    return await res.json();
  }

  async addCourse(course: CourseDTO) {
    const res = await fetch('/api/courses', {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await res.json();
  }

  async deleteCourse(name: string) {
    const res = await fetch('/api/courses/' + name, {
      method: 'DELETE'
    });
    return await res.text();
  }
}

export default new API();
