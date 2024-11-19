import { type ReactNode, useState } from 'react';
import { Layout as AntLayout } from 'antd';

import Header from '../Header.tsx';
import Sider from '../Sider.tsx';
import Main from '../Main.tsx';

const AppLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AntLayout>
      <Sider collapsed={collapsed} />
      <AntLayout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Main>{children}</Main>
      </AntLayout>
    </AntLayout>
  );
};

export default AppLayout;
