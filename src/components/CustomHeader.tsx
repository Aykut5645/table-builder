import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomHeaderProps } from 'ag-grid-react';
import { Input } from 'antd';

import {
  selectIsColumnsEditMode,
  updateColumnHeaderName,
} from '../store/columnSlice';

const CustomHeader = ({ displayName, column }: CustomHeaderProps) => {
  const [inputValue, setInputValue] = useState(displayName);
  const isColumnsEditMode = useSelector(selectIsColumnsEditMode);
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(
        updateColumnHeaderName({
          field: column.getColId(),
          headerName: inputValue,
        })
      );
    }
  };

  const handleBlur = () => {
    dispatch(
      updateColumnHeaderName({
        field: column.getColId(),
        headerName: inputValue,
      })
    );
  };

  if (!isColumnsEditMode) {
    return (
      <span data-ref="eText" className="ag-header-cell-text">
        {displayName}
      </span>
    );
  }

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
