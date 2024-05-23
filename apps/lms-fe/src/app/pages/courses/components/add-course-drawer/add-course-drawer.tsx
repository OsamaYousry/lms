import {Box, Drawer, Typography} from "@mui/material";
import {AddCourseForm} from "../add-course-form/add-course-form";

interface AddCourseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export const AddCourseDrawer: React.FC<AddCourseDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box width="500" padding="1rem">
        <Typography variant="h6">Add Course</Typography>
        <AddCourseForm onSuccess={onClose} />
      </Box>
    </Drawer>
  );
}
