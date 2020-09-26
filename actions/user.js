// SWR works with three main steps: first, it returns the data from the cache (the stale part), then sends the fetch request (the revalidate part), and finally comes with the up-to-date data.
import useSWR from "swr";
import { fetcher } from "@/actions";

export const useGetUser = () => {
  const { data, error, ...rest } = useSWR("/api/v1/me", fetcher);
  return { data, error, loading: !data && !error, ...rest };
};
