import { useQuery } from "@tanstack/react-query";

type QueryT = {
  queryKey: string[];
  queryFn: () => any;
};
export const useCustomQuery = ({ queryKey, queryFn }: QueryT) => {
  const query = useQuery({
    queryKey,
    queryFn,
  });

  return query;
};
