import {Box, Button, CircularProgress, TextField} from "@mui/material";
import {FieldArray, Formik} from "formik";
import {CourseDTO} from "@lms/data";
import {addCourseSchema} from "@lms/data";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import Api from "../../../../apis/api";
import {ScheduleForm} from "./schedule-form";

interface AddCourseFormProps {
  onSuccess: () => void;
  editObject?: CourseDTO;
}

export const AddCourseForm: React.FC<AddCourseFormProps> = ({onSuccess, editObject}) => {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: (values: CourseDTO) => Api.addCourse(values),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['courses']
      }).then(() => onSuccess());
    }
  });

  const editMutation = useMutation({
    mutationFn: (values: CourseDTO) => Api.editCourse(values),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['courses']
      }).then(() => onSuccess());
    }
  });

  const handleSubmit = (values: CourseDTO) => {
    if (editObject) {
      editMutation.mutate(values);
    } else {
      addMutation.mutate(values);
    }
  };


  const initialValues = Object.assign({}, {
    title: '', description: '', schedule: [{
      day: 0,
      startTime: '',
      endTime: ''
    }]
  }, editObject);


  return (
    <Formik initialValues={initialValues} validationSchema={addCourseSchema} onSubmit={handleSubmit}>
      {({values, handleChange, handleSubmit, handleBlur, isSubmitting, isValid, errors, dirty}) => (
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap="1.5rem"
             paddingTop="1.5rem">
          <TextField label="Title" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur}
                     error={errors.title !== undefined} helperText={errors.title}/>
          <TextField label="Description" name="description" value={values.description} onChange={handleChange}
                     onBlur={handleBlur} error={errors.description !== undefined} helperText={errors.description}/>
          <FieldArray name={'schedule'}
                      render={(arrayHelpers) => (<ScheduleForm arrayHelpers={arrayHelpers}/>)}/>

          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting || !isValid || !dirty}>
            {(addMutation.isPending || editMutation.isPending) &&
              <CircularProgress color="info" size={25} sx={{marginRight: '0.5rem'}}/>} {editObject ? 'Edit ' : 'Add '}
            Course</Button>
        </Box>
      )}
    </Formik>
  );
}
