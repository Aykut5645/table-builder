import { useState } from "react";
import { Layout } from "antd";
import { type ReactNode } from "react";
import CustomSider from "./CustomSider.tsx";
import CustomHeader from "./CustomHeader.tsx";
import CustomContent from "./CustomContent.tsx";
import { Content } from "antd/es/layout/layout";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <CustomSider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <CustomHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            padding: "2.4rem 1.6rem",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
