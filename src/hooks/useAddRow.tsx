import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addRow as addRowApi } from '../apis';
import { RowDataType } from '../types/Row.tsx';

const useAddRow = (onRowAdded?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate: addRow, isPending: isAddingRow } = useMutation({
    mutationFn: ({
      rowData,
      tableId,
    }: {
      rowData: RowDataType;
      tableId: string;
    }) => addRowApi(rowData, tableId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rows'] });
      if (onRowAdded) {
        onRowAdded();
      }
    },
  });

  return { isAddingRow, addRow };
};

export { useAddRow };
