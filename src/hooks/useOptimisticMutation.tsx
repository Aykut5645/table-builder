import { QueryKey, useMutation } from '@tanstack/react-query';
import { queryClient } from '../main';

type MutationFn<T> = (variables: T) => Promise<void>;

interface UseOptimisticMutationProps<T> {
  mutationFn: MutationFn<T>;
  queryKey: QueryKey;
  onMutate?: (variables: T) => Promise<void>;
  onSettled?: () => void;
}

function useOptimisticMutation<T>({
  mutationFn,
  queryKey,
  onMutate,
  onSettled,
}: UseOptimisticMutationProps<T>) {
  return useMutation({
    mutationFn,
    onMutate: async (variables: T) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);
      if (onMutate) await onMutate(variables);

      return { previousData };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      if (onSettled) onSettled();
    },
  });
}

export { useOptimisticMutation };
