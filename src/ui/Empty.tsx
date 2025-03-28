import { CSSProperties, ReactNode } from 'react';
import { Empty as AntEmpty, EmptyProps as AntEmptyProps } from 'antd';

type EmptyProps = {
  style: CSSProperties;
  children: ReactNode;
} & AntEmptyProps;

const Empty = ({ style, description, children }: EmptyProps) => {
  return (
    <AntEmpty
      style={style}
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      description={description}
    >
      {children}
    </AntEmpty>
  );
};

export default Empty;
