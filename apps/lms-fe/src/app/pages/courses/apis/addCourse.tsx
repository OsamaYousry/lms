import {CourseDTO} from "@lms/data";

export const addCourse = async (course: CourseDTO) => {
  const res = await fetch('/api/courses', {
    method: 'POST',
    body: JSON.stringify(course),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await res.json();
}
