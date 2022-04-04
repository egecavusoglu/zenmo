import { useQuery } from "../fetch";

export function useProfile(orgId) {
  const { data, error } = useQuery(`/api/self`);
  return {
    user: data?.user,
    loading: !error && !data,
    error: error,
  };
}
