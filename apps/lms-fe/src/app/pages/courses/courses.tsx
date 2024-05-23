import {Box, Fab, Typography} from "@mui/material";
import {CoursesList} from "./components/list/courses-list";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import {AddCourseDrawer} from "./components/add-course-drawer/add-course-drawer";


export const Courses: React.FC = () => {

  const [isAdding, setIsAdding] = useState(false);

  const handleAddCourse = () => {
    setIsAdding(true);
  };

  return (
    <Box display="flex" flexDirection="column" gap="2rem">
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h6">
          Courses List
        </Typography>
        <Fab color="primary" variant="extended" onClick={handleAddCourse}><AddIcon/> Add Course</Fab>
        <AddCourseDrawer isOpen={isAdding} onClose={() => setIsAdding(false)}/>
      </Box>
      <CoursesList/>
    </Box>
  );
}
