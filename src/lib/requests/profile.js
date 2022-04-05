import { useQuery } from "../fetch";

export function useToken() {
  const { data, error } = useQuery("/api/token");
  return {
    user: data?.user,
    loading: !error && !data,
    error: error,
  };
}

export function useProfile(userId) {
  const { data, error } = useQuery(`/api/users/${userId}`);
  return {
    user: data?.user,
    loading: !error && !data,
    error: error,
  };
}
