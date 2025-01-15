import { Layout, theme } from 'antd';

import Title from './Title.tsx';
import TableSettings from '../components/TableSettings/TableSettings.tsx';

const { Sider: AntSider } = Layout;

const Sider = ({ collapsed }: { collapsed: boolean }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const titleColor = colorBgContainer === '#ffffff' ? 'black' : 'white';

  return (
    <AntSider
      width={300}
      breakpoint="sm"
      collapsed={collapsed}
      collapsedWidth={0}
      style={{
        overflow: 'hidden',
        minHeight: '100vh',
        background: colorBgContainer,
      }}
    >
      <div
        style={{ margin: 'auto', width: 'fit-content', padding: '1.5rem 0' }}
      >
        <Title
          level={4}
          style={{
            color: titleColor,
            letterSpacing: 1,
          }}
        >
          Table Builder
        </Title>
      </div>
      <div
        style={{
          overflowY: 'auto',
          height: 'calc(100vh - 82px)',
        }}
      >
        <TableSettings />
      </div>
    </AntSider>
  );
};

export default Sider;
