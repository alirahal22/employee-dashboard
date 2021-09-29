import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { push } from "redux-first-history";
import { RootState } from "&store/store";
import { Layout, Row, Menu, Col } from "antd";
import { useTranslation } from "react-i18next";

import { coreActions } from "&features/core/core.slice";
import { loginActions } from "&features/login/login.slice";
import { LinkButton } from "&styled/button/button.component";
import { SearchBar } from "&styled/search/search.component";
import { TopMenu } from "&styled/menu/menu.component";

import { ReactComponent as MenuIcon } from "&assets/images/ic-menu.svg";
import { ReactComponent as Collapse } from "&assets/images/ic-collapse.svg";
import { ReactComponent as Translate } from "&assets/images/ic-translate.svg";

type ReduxProps = ConnectedProps<typeof connector>;

const { Header } = Layout;
const { SubMenu, Item } = Menu;

const AppHeader = (props: ReduxProps) => {
  const { toggleMenu, isMenuCollapsed, push } = props;
  const { i18n, t } = useTranslation(["common"]);

  const loadLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const options = [
    { label: t("DEPARTMENTS"), value: "department" },
    { label: t("BRANCHES"), value: "branches" },
    { label: t("EMPLOYEES"), value: "employees" },
    { label: t("SETTINGS"), value: "account" },
  ];

  return (
    <Header id="header">
      <Row align="middle">
        <Row id="brand" align="middle" justify="space-between">
          <LinkButton onClick={() => toggleMenu()}>
            {isMenuCollapsed ? <MenuIcon /> : <Collapse />}
          </LinkButton>
          <LinkButton onClick={() => push("/")}>
            <div>{t("EMPLOYEE_DIRECTORY")}</div>
          </LinkButton>
        </Row>

        <Row id="topbar" justify="space-between">
          <Col xs={0} sm={0} md={6} lg={12} xl={12} xxl={12}>
            <TopMenu>
              <Item>
                <SearchBar
                  options={options}
                  onSelect={push}
                  placeholder={t("SEARCH_PLACEHOLDER")}
                />
              </Item>
            </TopMenu>
          </Col>
          <Col>
            <TopMenu>
              <SubMenu icon={<Translate />}>
                <Item
                  onClick={() => {
                    loadLanguage("en");
                  }}
                >
                  English
                </Item>
              </SubMenu>
            </TopMenu>
          </Col>
        </Row>
      </Row>
    </Header>
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
  toggleMenu: coreActions.toggleMenu,
  push,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const AppHeaderRedux = connector(AppHeader);

export { AppHeaderRedux as AppHeader };
