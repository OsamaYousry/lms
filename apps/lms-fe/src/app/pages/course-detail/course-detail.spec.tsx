import api from "../../apis/api";
import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {CourseDetail} from "./course-detail";
import {useParams} from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn().mockReturnValue({title: 'Course Title'})
}));
describe('CourseDetail', () => {
  let queryClient: QueryClient;

  const renderCourseDetail = () => {
    return render(<QueryClientProvider client={queryClient}><CourseDetail/></QueryClientProvider>);
  }
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {retry: false}
      }
    });
    (useParams as jest.Mock).mockReturnValue({title: 'Course Title'});
    jest.clearAllMocks();
  });
  describe('when the course is pending', () => {
    beforeEach(() => {
      (api.fetchCourse as jest.Mock).mockReturnValue(new Promise(() => {
      }));
    });
    it('should show a loading spinner', () => {
      renderCourseDetail();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });
  describe('when there is an error fetching the course', () => {
    beforeEach(() => {
      (api.fetchCourse as jest.Mock).mockRejectedValue(new Error('Error fetching course'));
    });
    it('should show an error message', async () => {
      renderCourseDetail();
      expect(await screen.findByText('Error fetching course')).toBeInTheDocument();
    });
  });
  describe('when the course is loaded', () => {
    beforeEach(() => {
      (api.fetchCourse as jest.Mock).mockResolvedValue({
        title: 'Course Title',
        description: 'Course Description',
        students: ['Student 1', 'Student 2']
      });
    });
    it('should show the course details', async () => {
      renderCourseDetail();
      expect(await screen.findByText('Course Title')).toBeInTheDocument();
      expect(screen.getByText('Course Description')).toBeInTheDocument();
      expect(screen.getByText('Students')).toBeInTheDocument();
      expect(screen.getByText('Student 1')).toBeInTheDocument();
      expect(screen.getByText('Student 2')).toBeInTheDocument();
    });
    it('should show a delete button for each student', async () => {
      renderCourseDetail();
      const buttons = await screen.findAllByTestId('delete-button-', {exact: false});
      expect(buttons).toHaveLength(2);
    });
    it('should add a student when the add button is clicked', async () => {
      renderCourseDetail();
      const addButton = await screen.findByTestId('add-button');
      (api.fetchCourse as jest.Mock).mockClear();
      const textField = screen.getByLabelText('Add Student') as HTMLInputElement;
      fireEvent.change(textField, {target: {value: 'New Student'}});
      fireEvent.click(addButton);
      await waitFor(() => expect(api.addStudent).toHaveBeenCalled());
      expect(api.addStudent).toHaveBeenCalledWith('Course Title', 'New Student');
      expect(textField.value).toBe('');
      expect(api.fetchCourse).toHaveBeenCalledWith('Course Title');
    });
    it('should delete a student when the delete button is clicked', async () => {
      renderCourseDetail();
      const deleteButton = await screen.findByTestId('delete-button-0');
      (api.fetchCourse as jest.Mock).mockClear();
      fireEvent.click(deleteButton);
      await waitFor(() => expect(api.deleteStudent).toHaveBeenCalled());
      expect(api.deleteStudent).toHaveBeenCalledWith('Course Title', 'Student 1');
      expect(api.fetchCourse).toHaveBeenCalledWith('Course Title');
    });
  });
});
