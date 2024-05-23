class StudentsModel {
  students: Record<string, string[]>;

  constructor() {
    this.students = {
      'Course 1': ['Student 1', 'Student 2'],
      'Course 2': ['Student 3', 'Student 4'],
      'Course 3': ['Student 5', 'Student 6'],
    };
  }

  getStudents(course: string) {
    return this.students[course] || [];
  }

  addStudent(course: string, student: string) {
    const students = this.students[course] || [];
    students.push(student);
    this.students[course] = students;
    return students;
  }

  deleteStudent(course: string, student: string) {
    const students = this.students[course] || [];
    const index = students.findIndex((s) => s === student);
    if (index === -1) {
      throw new Error('Student not found');
    } else {
      students.splice(index, 1);
      this.students[course] = students;
      return students;
    }
  }
}

export default new StudentsModel();
