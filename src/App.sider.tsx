import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { push } from "redux-first-history";
import { RootState } from "&store/store";
import { Layout, Menu, Row } from "antd";
import { useTranslation } from "react-i18next";

import { loginActions } from "&features/login/login.slice";
import { SideMenu } from "&styled/menu/menu.component";

import { ReactComponent as Settings } from "&assets/images/ic-settings.svg";
import { ReactComponent as Employees } from "&assets/images/ic-employee.svg";

type ReduxProps = ConnectedProps<typeof connector>;

const { Sider } = Layout;
const { Item, ItemGroup } = Menu;

const COLLAPSED_WIDTH = 64;
const EXPANDED_WIDTH = 250;

const AppSider = (props: ReduxProps) => {
  const { push, pathname, isMenuCollapsed } = props;
  const { t } = useTranslation(["common"]);

  return (
    <Sider
      id="sider"
      collapsible
      trigger={null}
      breakpoint="md"
      collapsed={isMenuCollapsed}
      collapsedWidth={COLLAPSED_WIDTH}
      width={EXPANDED_WIDTH}
    >
      <SideMenu collapsedWidth={COLLAPSED_WIDTH} selectedKeys={[pathname]}>
        <ItemGroup key="main" title={t("MAIN")}>
          <Item
            key="/"
            icon={<Settings />}
            onClick={() => {
              push("/");
            }}
          >
            {t("DEPARTMENTS")}
          </Item>
          <Item
            key="/branches"
            icon={<Settings />}
            onClick={() => {
              push("/branches");
            }}
          >
            {t("BRANCHES")}
          </Item>
          <Item
            key="/employees"
            icon={<Employees />}
            onClick={() => {
              push("/employees");
            }}
          >
            {t("EMPLOYEES")}
          </Item>
        </ItemGroup>
      </SideMenu>
      <SideMenu collapsedWidth={COLLAPSED_WIDTH} selectedKeys={[pathname]}>
        <ItemGroup key="help" title={t("HELP")}>
          <Item
            key="/settings"
            icon={<Settings />}
            onClick={() => {
              push("/account");
            }}
          >
            {t("SETTINGS")}
          </Item>
        </ItemGroup>
        <Row
          align="bottom"
          style={{ height: "100%", paddingBottom: 50 }}
          justify="center"
        >
          <div>{t("COPYRIGHT")}</div>
        </Row>
      </SideMenu>
    </Sider>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  pathname: state.router.location.pathname,
  isMenuCollapsed: state.core.isMenuCollapsed,
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  logOut: loginActions.logOut,
  push,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const AppSiderRedux = connector(AppSider);

export { AppSiderRedux as AppSider };
