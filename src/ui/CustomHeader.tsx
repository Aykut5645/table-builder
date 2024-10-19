import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header } = Layout;

type CustomHeaderProps = {
  collapsed: boolean;
  setCollapsed: (x: boolean) => void;
};

const CustomHeader = ({ collapsed, setCollapsed }: CustomHeaderProps) => {
  return (
    <Header
      style={{
        padding: 0,
        background: "white",
        borderBottom: "3px solid #001529",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "1.6rem",
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};

export default CustomHeader;
