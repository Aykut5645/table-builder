import Sider from "antd/es/layout/Sider";

import CustomMenu from "./CustomMenu.tsx";
import CustomTitle from "./CustomTitle.tsx";

type CustomSiderProps = {
  collapsed: boolean;
  setCollapsed: (x: boolean) => void;
};

const CustomSider = ({ collapsed, setCollapsed }: CustomSiderProps) => {
  const breakPointHandler = (broken: boolean) => {
    broken ? setCollapsed(true) : setCollapsed(false);
  };

  return (
    <Sider
      breakpoint="sm"
      collapsed={collapsed}
      onBreakpoint={breakPointHandler}
      style={{ overflow: "hidden", minHeight: "100vh" }}
    >
      <div style={{ margin: "auto", width: "fit-content", padding: 27 }}>
        <CustomTitle
          level={3}
          style={{
            color: "white",
            fontFamily: "cursive",
            letterSpacing: 1,
          }}
        >
          {collapsed ? "T" : "Table"}
          <span style={{ color: "white" }}>{collapsed ? "B" : "Builder"}</span>
        </CustomTitle>
      </div>
      <CustomMenu />
    </Sider>
  );
};

export default CustomSider;
