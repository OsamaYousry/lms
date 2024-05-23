export const useFetchCourses = async (page = 0) => {
  const res = await fetch('/api/courses?page=' + page);
  return await res.json();
}
