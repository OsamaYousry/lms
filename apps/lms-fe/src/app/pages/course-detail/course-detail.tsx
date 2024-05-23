import {useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import api from "../courses/apis/api";
import {CourseDTO} from "@lms/data";

export const CourseDetail: React.FC = () => {
  const {title} = useParams<{ title: string }>();
  const {isPending, data} = useQuery<CourseDTO>({
    queryKey: ['course', title],
    queryFn: () => api.fetchCourse(title!)
  });

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {data && (
        <div>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <p>{data.students?.map((student, index) =>
            (<span key={index}>{student}</span>)
          )}</p>
        </div>
      )}
    </div>
  );
}
