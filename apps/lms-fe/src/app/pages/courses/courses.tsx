import {Typography} from "@mui/material";
import {CoursesList} from "./components/list/courses-list";

export const Courses: React.FC = () => {
  return (
    <>
      <Typography variant="h6">
        Courses List
      </Typography>
      <CoursesList/>
    </>
  );
}
