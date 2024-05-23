import {Box, Button, TextField} from "@mui/material";

export const AddCourseForm: React.FC = () => {
  return (
    <form>
      <Box display="flex" flexDirection="column" gap="1rem" paddingTop="1rem">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add Course
        </Button>
      </Box>
    </form>
  );
}
