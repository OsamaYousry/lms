import {Box, Drawer, Typography} from "@mui/material";
import {AddCourseForm} from "../add-course-form/add-course-form";
import {CourseDTO} from "@lms/data";

interface AddCourseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editObject?: CourseDTO
}
export const AddCourseDrawer: React.FC<AddCourseDrawerProps> = ({ isOpen, onClose, editObject }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box width="500" padding="1rem">
        <Typography variant="h6">{editObject ? 'Edit ' : 'Add '} Course</Typography>
        <AddCourseForm onSuccess={onClose} editObject={editObject} />
      </Box>
    </Drawer>
  );
}
