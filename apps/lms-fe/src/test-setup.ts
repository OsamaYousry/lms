import "@testing-library/jest-dom";

jest.mock("./app/apis/api", () => ({
  fetchCourses: jest.fn(),
  addCourse: jest.fn(),
  editCourse: jest.fn(),
  deleteCourse: jest.fn(),
  fetchCourse: jest.fn(),
  addStudent: jest.fn(),
  deleteStudent: jest.fn(),
}))
