export interface CourseDTO {
  title: string;
  description: string;
  schedule: ScheduleDTO[]
  students?: string[];
}

export interface ScheduleDTO {
  day: number;
  startTime: string;
  endTime: string;
}
