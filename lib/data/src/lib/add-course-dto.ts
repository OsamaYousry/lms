import {array, number, object, string} from "yup";

export const addCourseSchema = object({
  title: string().required().max(100),
  description: string().required().max(500),
  schedule: array(object({
    day: number().required().min(0).max(6),
    startTime: string().required('Start time is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    endTime: string().required('End time is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  })).min(1)
})
