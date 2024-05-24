import {CourseDTO, ScheduleDTO} from "@lms/data";
import {Box, Button, Fab, FormHelperText, Select, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {FieldArrayRenderProps, useFormikContext} from "formik";

interface ScheduleFormProps {
  arrayHelpers: FieldArrayRenderProps;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({arrayHelpers}) => {
  const {values, handleChange, handleBlur, errors} = useFormikContext<CourseDTO>();

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

  const showScheduleErrors = (errors: any, index: number) => {
    if (!errors || !errors.schedule || !errors.schedule[index]) return null;

    return Object.keys(errors.schedule[index]).map((key) => (
      <FormHelperText key={key} error>{errors.schedule[index][key]}</FormHelperText>
    ));
  }

  return (<Box display="flex" flexDirection="column" gap="1.5rem">{
    values.schedule.map((schedule: ScheduleDTO, index: number) => (
      <div key={index}>
        <Box display="flex" flexDirection="row" gap="0.5rem">
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
                     onChange={handleChange}
          />
          <TextField name={`schedule.${index}.endTime`} value={schedule.endTime}
                     type="time"
                     onBlur={handleBlur}
                     onChange={handleChange}/>
          <Fab color="error"
               onClick={removeSchedule.bind(null, arrayHelpers, index, values.schedule)}><DeleteIcon/></Fab>
        </Box>
        {showScheduleErrors(errors, index)}
      </div>
    ))
  }
    <Button variant="contained" color="secondary"
            onClick={addSchedule.bind(null, arrayHelpers, values.schedule)}
            disabled={values.schedule.length === 7}><AddIcon/> Add Schedule</Button>
  </Box>)
}
