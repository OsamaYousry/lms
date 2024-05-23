export interface CourseDTO {
  title: string;
  description: string;
  schedule: {
    day: number;
    startTime: string;
    endTime: string;
  }
}
