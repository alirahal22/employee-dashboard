import React from "react";
import { Col, Row } from "antd";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "react-i18next";

import { RootState } from "&store/store";
import { PrimaryButton } from "&styled/button/button.component";
import { loginActions } from "&features/login/login.slice";

type ReduxProps = ConnectedProps<typeof connector>;

const AccountComponent = (props: ReduxProps) => {
  const { username, logOut } = props;
  const { t } = useTranslation(["account", "common"]); // Make sure namespace is added to locales

  return (
    <Row justify="center">
      <Col span={5}>
        <h1>{t("ACCOUNT")}</h1>
        <Row justify="space-between">
          <Col>
            <p>{t("common:USERNAME")}</p>
          </Col>

          <Col>
            <strong>{username}</strong>
          </Col>
        </Row>
        <PrimaryButton
          danger
          onClick={() => {
            logOut();
          }}
        >
          {t("common:LOG_OUT")}
        </PrimaryButton>
      </Col>
    </Row>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  username: state.login.username,
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
const AccountComponentRedux = connector(AccountComponent);

export { AccountComponentRedux as AccountComponent };
