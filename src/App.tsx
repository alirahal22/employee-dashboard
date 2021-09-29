import React, { CSSProperties, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ConfigProvider, Layout, message } from "antd";
import { useTranslation } from "react-i18next";
import { useIdleTimer } from "react-idle-timer";
import "antd/dist/antd.css";

import "./App.css";
import { RootState } from "&store/store";
import { AppRouter } from "./App.router";
import { AppHeader } from "./App.header";
import { AppSider } from "./App.sider";
import { loginActions } from "&features/login/login.slice";

import "./interceptors";

const { Content } = Layout;

type ReduxProps = ConnectedProps<typeof connector>;

const App = (props: ReduxProps) => {
  const { isAuthenticated, isMenuCollapsed, timestamp = 0, logOut } = props;
  const { i18n, t } = useTranslation(["app"]);

  message.config({ maxCount: 1, duration: 2 });

  /** This useEffect checks if session is expired. */
  useEffect(() => {
    if (
      isAuthenticated &&
      new Date().getTime() - timestamp > 3 * 60 * 60 * 1000
    ) {
      logOut();
    }
  }, [isAuthenticated, logOut, timestamp]);

  const handleOnIdle = () => {
    if (isAuthenticated) {
      message.warn(t("INACTIVITY"), 5);
      logOut();
    }
  };

  const renderContentStyle = (): CSSProperties => ({
    marginTop: isAuthenticated ? 70 : 0,
    marginInlineStart: isAuthenticated ? (isMenuCollapsed ? 64 : 250) : 0,
    overflow: "auto",
    padding: isAuthenticated ? 40 : 0,
    background: "#fafafa",
  });

  // 3 minutes idle timer
  useIdleTimer({
    timeout: 1000 * 60 * 60 * 30,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  return (
    /* This wrapper handles rtl and ltr directions for i18n */
    <ConfigProvider direction={i18n.dir()}>
      <Layout id="container" className="app">
        {isAuthenticated && <AppHeader />}
        <Layout>
          {/* Side Bar component */}
          {isAuthenticated && <AppSider />}
          <Content style={renderContentStyle()}>
            <AppRouter />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  username: state.login.username,
  isAuthenticated: state.login.isLoggedIn,
  timestamp: state.login.timestamp,
  isMenuCollapsed: state.core.isMenuCollapsed,
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  logOut: loginActions.logOut,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const AppRedux = connector(App);

export { AppRedux as App };
