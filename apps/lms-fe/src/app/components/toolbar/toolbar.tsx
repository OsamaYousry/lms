import {AppBar, Toolbar, Typography} from "@mui/material";

export const LMSToolbar: React.FC = () => {
  return (
    <AppBar component="nav" position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LMS
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
