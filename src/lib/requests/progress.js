import { useQuery } from "../fetch";

export function useProgress(userId) {
  const { data, error, mutate } = useQuery(`/api/progress`);
  return {
    progress: data?.data,
    loading: !error && !data,
    error: error,
    mutator: mutate,
  };
}
