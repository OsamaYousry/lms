import {Box, Button, Fab, Select, TextField} from "@mui/material";
import {FieldArray, FieldArrayRenderProps, Formik} from "formik";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {ScheduleDTO} from "@lms/data";


export const AddCourseForm: React.FC = () => {
  const handleSubmit = (values: any, {setSubmitting}: { setSubmitting: (input: boolean) => void }) => {
    console.log(values);
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  const addSchedule = (arrayHelpers: FieldArrayRenderProps, schedule: ScheduleDTO[]) => {
    arrayHelpers.insert(schedule.length, {
      day: 0,
      startTime: '',
      endTime: ''
    });
  }

  const removeSchedule = (arrayHelpers: FieldArrayRenderProps, index: number, schedule: ScheduleDTO[]) => {
    if (schedule.length === 1) return;
    arrayHelpers.remove(index);
  }
  return (
    <Formik initialValues={{
      title: '', description: '', schedule: [{
        day: 0,
        startTime: '',
        endTime: ''
      }]
    }} onSubmit={handleSubmit}>
      {({values, handleChange, handleSubmit, handleBlur, isSubmitting, setSubmitting, isValid}) => (
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap="1.5rem"
             paddingTop="1.5rem">
          <TextField label="Title" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur}/>
          <TextField label="Description" name="description" value={values.description} onChange={handleChange}
                     onBlur={handleBlur}/>
          <FieldArray name={'schedule'}
                      render={arrayHelpers => (
                        <Box display="flex" flexDirection="column" gap="1.5rem">{
                          values.schedule.map((schedule: ScheduleDTO, index: number) => (
                            <Box display="flex" flexDirection="row" gap="0.5rem" key={index}>
                              <Select name={`schedule.${index}.day`} defaultValue={schedule.day}
                                      native
                                      onChange={handleChange}>
                                <option value={0}>Sun</option>
                                <option value={1}>Mon</option>
                                <option value={2}>Tue</option>
                                <option value={3}>Wed</option>
                                <option value={4}>Thu</option>
                                <option value={5}>Fri</option>
                                <option value={6}>Sat</option>
                              </Select>
                              <TextField name={`schedule.${index}.startTime`} value={schedule.startTime}
                                         type="time"
                                         onBlur={handleBlur}
                                         onChange={handleChange}/>
                              <TextField name={`schedule.${index}.endTime`} value={schedule.endTime}
                                         type="time"
                                         onBlur={handleBlur}
                                         onChange={handleChange}/>
                              <Fab color="error"
                                   onClick={removeSchedule.bind(null, arrayHelpers, index, values.schedule)}><DeleteIcon/></Fab>
                            </Box>
                          ))
                        }
                          <Button variant="contained" color="secondary"
                                  onClick={addSchedule.bind(null, arrayHelpers, values.schedule)}
                                  disabled={values.schedule.length === 7}><AddIcon/> Add Schedule</Button>
                        </Box>
                      )}/>

          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting || !isValid}>Add
            Course</Button>
        </Box>
      )}
    </Formik>
  );
}
