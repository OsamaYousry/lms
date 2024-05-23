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
import {keepPreviousData, useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";

export const CoursesList: React.FC = () => {
  const [page, setPage] = useState(0);

  const fetchCourses = (page = 0) => fetch(`/api/courses?page=${page}`).then((res) => res.json());


  const { isPending, isError, data, error, isFetching, isPlaceholderData } = useQuery<{
    title: string;
    description: string;
    schedule: string
  }[]>({
    queryKey: ['courses', page],
    queryFn: () => fetchCourses(page),
    placeholderData: keepPreviousData
  });

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
            data?.map((row) => (
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
            <TablePagination count={data?.length || 0} page={0} rowsPerPage={10} onPageChange={() => {}} />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
