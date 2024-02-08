import {
  useMutation,
  useQueryClient,
  MutationOptions,
  MutateFunction,
} from "@tanstack/react-query";

type UseCustomMutationProps<TData, TError, TVariables> = {
  queryKey: Array<string | number>;
  mutationFn: MutateFunction<TData, TError, TVariables>;
};

const useCustomMutation = <TData = unknown, TError = unknown, TVariables = unknown>(
  { queryKey, mutationFn }: UseCustomMutationProps<TData, TError, TVariables>,
  options?: MutationOptions<TData, TError, TVariables>
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => mutationFn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    ...options,
  });

  const handleMutation = (data: TVariables) => {
    mutation.mutate(data);
  };

  return { mutation, handleMutation };
};

export default useCustomMutation;
