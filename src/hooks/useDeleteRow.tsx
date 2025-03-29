import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSelectedRow as deleteSelectedRowApi } from '../apis';

const useDeleteRow = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteRow, isPending: isDeletingRow } = useMutation({
    mutationFn: (rowId: number) => deleteSelectedRowApi(rowId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rows'] });
    },
  });

  return { isDeletingRow, deleteRow };
};

export { useDeleteRow };
