import {AppBar, Box, Toolbar, Typography} from "@mui/material";

export const LMSToolbar: React.FC = () => {
  return (
    <AppBar component="nav" position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div">
          LMS
        </Typography>
        <Box display="flex" flexDirection="row" gap="1rem" marginLeft="3rem">
          <Typography variant="body1">
            <a href="/courses">Courses</a>
          </Typography>
          <Typography variant="body1">
            <a href="/students">Students</a>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
