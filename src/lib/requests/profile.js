import { useAuthStore } from "src/store";
import { useQuery } from "../fetch";

export function useToken() {
  const { data, error } = useQuery("/api/token");
  if (data?.user) {
    useAuthStore.setState({
      isLoggedIn: true,
    });
  }
  return {
    user: data?.user,
    loading: !error && !data,
    error: error,
  };
}

export function useProfile(userId) {
  const { data, error } = useQuery(`/api/users/${userId}`);
  if (data?.user) {
    useAuthStore.setState({
      user: data?.user,
      isLoggedIn: true,
    });
  }
  return {
    user: data?.user,
    loading: !error && !data,
    error: error,
  };
}
