import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination, Skeleton
} from "@mui/material";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {useFetchCourses} from "../../hooks/useFetchCourses";
import {CourseDTO, PaginatedDTO} from "@lms/data";

export const CoursesList: React.FC = () => {
  const [page, setPage] = useState(0);


  const {isPending, isError, data} = useQuery<PaginatedDTO<CourseDTO>>({
    queryKey: ['courses', page],
    queryFn: () => useFetchCourses(page),
    placeholderData: keepPreviousData
  });

  const formatSchedule = ({day, startTime, endTime}: { day: number, startTime: string, endTime: string }) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (<>{`${days[day]} ${startTime} - ${endTime}`}<br/></>);
  }

  const listSkeleton = Array.from({length: 5}).map((_, index) => (
    <TableRow key={index}>
      <TableCell><Skeleton variant="rectangular" width={210} height={20}/></TableCell>
      <TableCell><Skeleton variant="rectangular" width={210} height={20}/></TableCell>
      <TableCell><Skeleton variant="rectangular" width={210} height={20}/></TableCell>
    </TableRow>
  ));

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
          {isPending && listSkeleton}
          {!isPending && data?.data?.map((row) => (
            <TableRow key={row.title}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.schedule.map(formatSchedule)}</TableCell>
            </TableRow>
          ))
          }
          {isError && <TableRow><TableCell colSpan={3}>Error fetching data</TableCell></TableRow>}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination count={data?.total || 0} page={data?.page || 0} rowsPerPage={data?.pageSize || 10}
                             onPageChange={() => {
                             }}/>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
