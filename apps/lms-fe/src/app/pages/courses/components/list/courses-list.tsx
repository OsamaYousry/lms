import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination
} from "@mui/material";

export const CoursesList: React.FC = () => {
  const createData = (title: string, description: string, schedule: string) => {
    return { title, description, schedule }
  };
  const rows = [
    createData('Course 1', 'Description 1', 'Schedule 1'),
    createData('Course 2', 'Description 2', 'Schedule 2'),
    createData('Course 3', 'Description 3', 'Schedule 3'),
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Schedule</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.map((row) => (
              <TableRow key={row.title}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.schedule}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination count={rows.length} page={0} rowsPerPage={10} onPageChange={() => {}} />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
