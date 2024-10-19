import type { CSSProperties, ReactNode } from "react";
import { Typography } from "antd";

const { Title } = Typography;

const fontSizes = {
  1: "3.8rem",
  2: "3rem",
  3: "2.4rem",
  4: "2rem",
  5: "1.6rem",
};

type CustomTitleProps = {
  level: 1 | 2 | 3 | 4 | 5;
  children: ReactNode;
  style?: CSSProperties;
};

const CustomTitle = ({ level, children, style }: CustomTitleProps) => {
  return (
    <Title style={{ fontSize: fontSizes[level], ...style }}>{children}</Title>
  );
};

export default CustomTitle;
