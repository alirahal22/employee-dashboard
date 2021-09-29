import React from "react";
import { Col, Form, Row, Layout, Space } from "antd";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "react-i18next";
import { push } from "redux-first-history";
import { usePromiseTracker } from "react-promise-tracker";

import styles from "./login.module.css";
import { RootState } from "&store/store";
import { loginActions } from "./login.slice";
import { InputPassword, InputText } from "&styled/input/input.component";
import { H1, SubTitle } from "&styled/typography/typography.component";
import { LinkButton, PrimaryButton } from "&styled/button/button.component";

import { ReactComponent as CapLogo } from "&assets/images/ic-employee.svg";
import { ReactComponent as DataAnalytics } from "&assets/images/data-analytics.svg";

type ReduxProps = ConnectedProps<typeof connector>;

const LoginComponent = (props: ReduxProps) => {
  const { logIn } = props;
  const { t } = useTranslation(["login", "common"]);
  const { promiseInProgress } = usePromiseTracker();

  const initialValues = {
    email: undefined,
    password: undefined,
  };

  const onFinish = (values: any) => {
    // If user enters email, username is email
    // Else concatinate code and mobile number then send
    logIn({
      password: values.password,
      username: values.email.trim(),
    });
  };

  return (
    <Layout className={styles.layout}>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16} xxl={14}>
          <Row className={styles.container} align="top">
            <Col className={styles.branding} sm={24} md={11}>
              <Space
                direction="vertical"
                align="center"
                className={styles.space}
              >
                <CapLogo style={{ width: 200 }} />
                <Row justify="center">
                  <DataAnalytics className={styles.art} />
                </Row>
                <Row justify="center">
                  <SubTitle>{t("BRANDING_MESSAGE")}</SubTitle>
                </Row>
                <Row align="bottom">
                  <div>{t("COPYRIGHT")}</div>
                </Row>
              </Space>
            </Col>
            <Col className={styles.form} sm={24} md={13}>
              <Form
                name="login"
                layout="vertical"
                requiredMark={"optional"}
                initialValues={initialValues}
                onFinish={onFinish}
              >
                <Form.Item>
                  <H1>{t("LOGIN_TITLE")}</H1>
                </Form.Item>
                <Form.Item
                  name="email"
                  label={t("common:USERNAME")}
                  rules={[
                    {
                      required: true,
                      message: t("common:REQUIRED_ERROR_MESSAGE", {
                        fieldName: t("common:USERNAME").toLowerCase(),
                      }),
                    },
                  ]}
                >
                  <InputText
                    autoComplete="email"
                    placeholder={t("USERNAME_PLACEHOLDER")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("common:PASSWORD_LABEL")}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: t("common:REQUIRED_ERROR_MESSAGE", {
                        fieldName: t("common:PASSWORD_LABEL"),
                      }),
                    },
                  ]}
                >
                  <InputPassword
                    autoComplete="current-password"
                    placeholder={t("common:PASSWORD_PLACEHOLDER")}
                  />
                </Form.Item>
                <Form.Item />
                <Form.Item>
                  <PrimaryButton loading={promiseInProgress} htmlType="submit">
                    {t("common:LOG_IN")}
                  </PrimaryButton>
                </Form.Item>

                <Col>
                  <div>{t("LOGIN_ERROR_MSG_1")}</div>
                  <div style={{ color: "#BFBFBF" }}>
                    {t("CONTACT_SUPPORT")}
                    <LinkButton
                      onClick={() => (window.location.href = "tel:+9613727679")}
                    >
                      +961 3 727679
                    </LinkButton>
                  </div>
                  <div style={{ color: "#BFBFBF" }}>
                    {t("EMAIL_SUPPORT")}
                    <LinkButton
                      onClick={() =>
                        (window.location.href =
                          "mailto:alirahal_22@outlook.com")
                      }
                    >
                      alirahal_22@outlook.com
                    </LinkButton>
                  </div>
                </Col>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  logIn: loginActions.logIn,
  push,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const LoginComponentRedux = connector(LoginComponent);

export { LoginComponentRedux as LoginComponent };
