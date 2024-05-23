import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination, Skeleton, Fab
} from "@mui/material";
import {keepPreviousData, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {CourseDTO, PaginatedDTO} from "@lms/data";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Api from "../../apis/api";
import {useNavigate} from "react-router-dom";

interface CoursesListProps {
  onEdit: (editObject: CourseDTO) => void;
}

export const CoursesList: React.FC<CoursesListProps> = ({onEdit}) => {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (name: string) => Api.deleteCourse(name),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['courses']
      });
    }
  });

  const handleDelete = ($event: React.MouseEvent, name: string) => {
    $event.stopPropagation();
    mutation.mutate(name);
  }

  const handleRoute = (course: CourseDTO) => {
    navigate(`/courses/${course.title}`);
  }

  const handleEdit = ($event: React.MouseEvent, editObject: CourseDTO) => {
    $event.stopPropagation();
    onEdit(editObject);
  }


  const {isPending, isError, data} = useQuery<PaginatedDTO<CourseDTO>>({
    queryKey: ['courses', page],
    queryFn: () => Api.fetchCourses(page),
    placeholderData: keepPreviousData
  });

  const formatSchedule = ({day, startTime, endTime}: { day: number, startTime: string, endTime: string }) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (<span key={day}>{`${days[day]} ${startTime} - ${endTime}`}<br/></span>);
  }

  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  }

  const listSkeleton = Array.from({length: 5}).map((_, index) => (
    <TableRow key={index}>
      <TableCell><Skeleton variant="rectangular" width={210} height={20}/></TableCell>
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
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isPending && listSkeleton}
          {!isPending && data?.data?.map((row) => (
            <TableRow key={row.title} onClick={handleRoute.bind(null, row)} sx={{ cursor: 'pointer' }}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.schedule.map(formatSchedule)}</TableCell>
              <TableCell sx={{gap: '0.5rem', display: 'flex'}}>
                <Fab size="small" color="primary" onClick={($event) => handleEdit($event, row)}><EditIcon/></Fab>
                <Fab size="small" color="error"
                     onClick={($event) => handleDelete($event, row.title)}><DeleteIcon/></Fab></TableCell>
            </TableRow>
          ))
          }
          {!isPending && data?.data?.length === 0 &&
            <TableRow><TableCell colSpan={3} sx={{textAlign: 'center'}}>No data</TableCell></TableRow>}
          {isError &&
            <TableRow><TableCell colSpan={3} sx={{textAlign: 'center'}}>Error fetching data</TableCell></TableRow>}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination count={data?.total || 0} page={data?.page || 0} rowsPerPage={data?.pageSize || 10}
                             onPageChange={handlePageChange}/>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
