import React from "react";
import { Menu, MenuProps } from "antd";

import "./index.css";

const SideMenu = (props: MenuProps) => (
  <Menu className="side_menu" mode="inline" {...props} />
);

const TopMenu = (props: MenuProps) => (
  <Menu className="top_menu" mode="horizontal" {...props} />
);

export { SideMenu, TopMenu };
