import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { CustomHeaderProps } from 'ag-grid-react';
import { Input } from 'antd';
import { updateHeaderName } from '../apis';
import { useOptimisticMutation } from '../hooks/useOptimisticMutation';
import { queryClient } from '../main';
import { ColumnType } from '../types/Column';
import { useTableContext } from '../hooks/useTableContext';

interface ICustomHeaderProps extends CustomHeaderProps {
  id: number;
}

const CustomHeader = (headerProps: ICustomHeaderProps) => {
  const { editMode, toggleEditMode, tableId } = useTableContext();
  const [inputValue, setInputValue] = useState(headerProps.displayName);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const updateHeaderNameMutation = useOptimisticMutation({
    mutationFn: async ({
      columnId,
      newHeaderName,
    }: {
      columnId: number;
      newHeaderName: string;
    }) => updateHeaderName(columnId, newHeaderName),
    queryKey: ['column', tableId],
    onMutate: async ({ columnId, newHeaderName }) => {
      queryClient.setQueryData(['columns', tableId], (old: ColumnType[]) => {
        return old.map((column) =>
          column.id === columnId
            ? { ...column, headerName: newHeaderName }
            : column
        );
      });
    },
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      updateHeaderNameMutation.mutate({
        columnId: headerProps.id,
        newHeaderName: inputValue,
      });
      toggleEditMode();
    }
  };

  const handleBlur = () => {
    if (inputValue) {
      updateHeaderNameMutation.mutate({
        columnId: headerProps.id,
        newHeaderName: inputValue,
      });
      toggleEditMode();
    }
  };

  // Render Default Header
  const renderDefaultHeader = () => {
    return (
      <div
        className="ag-cell-label-container"
        role="presentation"
        id={headerProps?.id?.toString()}
      >
        {/* Menu Icon */}
        {headerProps.enableMenu && (
          <span
            onClick={(e) => headerProps.showColumnMenu(e.target as HTMLElement)}
            className="ag-header-icon ag-header-cell-menu-button"
            aria-hidden="true"
          />
        )}

        {/* Filter Icon */}
        {headerProps.enableFilterButton && (
          <span
            className="ag-header-icon ag-header-cell-filter-button"
            aria-hidden="true"
            onClick={(e) => headerProps.showFilter(e.target as HTMLElement)}
          >
            <span
              className="ag-icon ag-icon-filter"
              unselectable="on"
              role="presentation"
            />
          </span>
        )}

        <div className="ag-header-cell-label" role="presentation">
          {/* Header Text */}
          <span className="ag-header-cell-text">{headerProps.displayName}</span>

          {/* Sort Icons */}
          {headerProps.enableSorting && (
            <>
              <span
                className="ag-header-icon ag-sort-ascending-icon"
                onClick={() => headerProps.setSort('asc')}
                role="presentation"
              />
              <span
                className="ag-header-icon ag-sort-descending-icon"
                onClick={() => headerProps.setSort('desc')}
                role="presentation"
              />
              <span
                className="ag-header-icon ag-sort-none-icon"
                onClick={() => headerProps.setSort(null)}
                role="presentation"
              />
            </>
          )}
        </div>
      </div>
    );
  };

  if (!editMode) return renderDefaultHeader();

  return (
    <Input
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
};

export default CustomHeader;
