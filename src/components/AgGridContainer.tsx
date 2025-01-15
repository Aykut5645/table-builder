import { ReactNode } from 'react';

type AgGridContainerProps = {
  children: ReactNode;
  tWidth: number;
  tHeight: number;
};

const AgGridContainer = ({
  children,
  tWidth,
  tHeight,
}: AgGridContainerProps) => {
  return (
    <div
      id="myGrid"
      style={{
        width: tWidth || "100%",
        height: tHeight,
      }}
    >
      {children}
    </div>
  );
};

export default AgGridContainer;
