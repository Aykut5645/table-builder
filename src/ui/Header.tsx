import { Button, Layout, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

type CustomHeaderProps = {
  collapsed: boolean;
  setCollapsed: (x: boolean) => void;
};

const Header = ({ collapsed, setCollapsed }: CustomHeaderProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntHeader
      style={{
        height: 66,
        padding: 0,
        background: colorBgContainer,
        borderBottom: '3px solid #001529',
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '1.6rem',
          width: 64,
          height: 64,
        }}
      />
    </AntHeader>
  );
};

export default Header;