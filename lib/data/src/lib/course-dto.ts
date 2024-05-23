export interface CourseDTO {
  title: string;
  description: string;
  schedule: ScheduleDTO[]
}

export interface ScheduleDTO {
  day: number;
  startTime: string;
  endTime: string;
}
