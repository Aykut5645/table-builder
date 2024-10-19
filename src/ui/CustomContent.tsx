import { ReactNode } from "react";
import { Content } from "antd/es/layout/layout";

const CustomContent = ({ children }: { children: ReactNode }) => {
  return (
    <Content
      style={{
        padding: "2.4rem 1.6rem",
      }}
    >
      {children}
    </Content>
  );
};

export default CustomContent;
