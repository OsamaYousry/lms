import {useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {CourseDTO} from "@lms/data";
import {
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  Typography,
  Divider,
  Box,
  TextField
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import api from "../../apis/api";

export const CourseDetail: React.FC = () => {
  const {title} = useParams<{ title: string }>();
  const [studentName, setStudentName] = useState<string>('');
  const {isPending, data, isError} = useQuery<CourseDTO>({
    queryKey: ['course', title],
    queryFn: () => api.fetchCourse(title!)
  });

  const queryClient = useQueryClient();

  const addStudentMutation = useMutation({
    mutationFn: (student: string) => api.addStudent(title!, student),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['course', title]
      }).then(() => {
        setStudentName('');
      });
    }
  });

  const deleteStudentMutation = useMutation({
    mutationFn: (student: string) => api.deleteStudent(title!, student),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['course', title]
      });
    }
  });

  return (
    <>
      {isPending && <CircularProgress sx={{display: 'block', margin: 'auto'}}/>}
      {isError && <Typography variant="h5" align="center">Error fetching course</Typography>}
      {data && (
        <Card sx={{maxWidth: '500px', display: 'block', margin: 'auto'}}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Typography variant="h5">{data.title}</Typography>
            <Typography variant="body1">{data.description}</Typography>
            <Divider/>
            <Typography variant="h6">Students</Typography>
            <List>
              {data.students?.map((student, index) => (
                <ListItem key={index}
                          sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>{student}
                  <DeleteIcon data-testid={`delete-button-${index}`} sx={{cursor: 'pointer'}} onClick={() => {
                    deleteStudentMutation.mutate(student)
                  }}/>
                </ListItem>
              ))}
            </List>
            <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop="2rem" alignItems="center">
              <TextField label="Add Student" variant="outlined" value={studentName} onChange={(e) => {
                setStudentName(e.target.value)
              }}
              />
              <AddIcon data-testid="add-button" sx={{cursor: 'pointer'}} onClick={() => {
                addStudentMutation.mutate(studentName)
              }}/>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
}
