import { GetProp, Menu, MenuProps } from "antd";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";

type MenuItem = GetProp<MenuProps, "items">[number];

const ITEMS: MenuItem[] = [
  {
    key: "1",
    icon: <HomeOutlined />,
  },
  {
    key: "2",
    icon: <PlusOutlined />,
  },
];

const CustomMenu = () => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={ITEMS}
    />
  );
};

export default CustomMenu;
