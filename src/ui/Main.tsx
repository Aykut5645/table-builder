import { ReactNode } from 'react';
import { Content as AntContent } from 'antd/es/layout/layout';

const Main = ({ children }: { children: ReactNode }) => {
  return <AntContent style={{ padding: '2.5rem' }}>{children}</AntContent>;
};

export default Main;
