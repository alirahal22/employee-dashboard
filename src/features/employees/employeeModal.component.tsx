import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Input, Row, Space } from "antd";

import { RootState } from "&store/store";
import { formatPhone } from "&utils/format";
import { employeesActions } from "./employees.slice";
import { LinkButton, PrimaryButton } from "&styled/button/button.component";
import { H2 } from "&styled/typography/typography.component";
import { RegularModal } from "&styled/modal/modal.component";
import { InputText } from "&styled/input/input.component";
import { CountryCodeSelect } from "&styled/select/select.component";

type ReduxProps = ConnectedProps<typeof connector>;

const EmployeeModalComponent = (props: ReduxProps) => {
  const { t } = useTranslation(["employees", "common"]); // Make sure namespace is added to locales
  const [form] = Form.useForm();

  const {
    isModalVisible,
    setModalVisible,
    initialValues,
    addEmployee,
    resetFormValues,
    pending,
  } = props;

  const { id } = initialValues;

  useEffect(() => {
    if (isModalVisible) form.resetFields();
  }, [form, isModalVisible]);

  const onFinish = async (values: any) => {
    await addEmployee(values);
    onClose();
  };

  const onClose = () => {
    resetFormValues();
    setModalVisible(false);
  };

  return (
    <RegularModal visible={isModalVisible}>
      <Form
        form={form}
        name="employee"
        layout="vertical"
        requiredMark={"optional"}
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <H2>{id ? t("EMPLOYEE_ID", { id }) : t("ADD_EMPLOYEE")}</H2>
        <Row justify="space-between">
          <Form.Item
            name="firstName"
            label={t("FIRST_NAME")}
            rules={[
              {
                required: true,
                message: t("common:REQUIRED_ERROR_MESSAGE", {
                  fieldName: t("FIRST_NAME").toLowerCase(),
                }),
              },
            ]}
          >
            <InputText
              maxLength={20}
              placeholder={t("FIRST_NAME_PLACEHOLDER")}
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            label={t("LAST_NAME")}
            rules={[
              {
                required: true,
                message: t("common:REQUIRED_ERROR_MESSAGE", {
                  fieldName: t("LAST_NAME").toLowerCase(),
                }),
              },
            ]}
          >
            <InputText placeholder={t("LAST_NAME_PLACEHOLDER")} />
          </Form.Item>
        </Row>
        <Form.Item
          name="email"
          label={t("EMAIL")}
          rules={[
            {
              required: true,
              message: t("common:REQUIRED_ERROR_MESSAGE", {
                fieldName: t("common:EMAIL_LABEL").toLowerCase(),
              }),
            },
            {
              type: "email",
              message: t("common:INVALID_ERROR_MESSAGE", {
                fieldName: t("common:EMAIL_LABEL").toLowerCase(),
              }),
            },
          ]}
        >
          <InputText
            autoComplete="email"
            placeholder={t("EMAIL_PLACEHOLDER")}
          />
        </Form.Item>
        <Form.Item label={t("PHONE_NUMBER")} required>
          <Input.Group compact>
            <Form.Item name={["phone", "code"]} noStyle>
              <CountryCodeSelect style={{ width: "35%" }} />
            </Form.Item>
            <Form.Item
              name={["phone", "number"]}
              validateFirst
              normalize={formatPhone}
              noStyle
              rules={[
                {
                  required: true,
                  message: t("common:REQUIRED_ERROR_MESSAGE", {
                    fieldName: t("common:MOBILE_LABEL").toLowerCase(),
                  }),
                },
                {
                  pattern: /^(\+91-|\+91|0)?\d{6,15}$/,
                  message: t("common:INVALID_ERROR_MESSAGE", {
                    fieldName: t("common:MOBILE_LABEL").toLowerCase(),
                  }),
                },
              ]}
            >
              <InputText
                maxLength={12}
                minLength={4}
                autoComplete="phone"
                placeholder={t("PHONE_NUMBER_PLACEHOLDER")}
                style={{ width: "65%" }}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item name="customField1" label={t("CUSTOM_FIELD_1")}>
          <InputText
            maxLength={32}
            placeholder={t("CUSTOM_FIELD_1_PLACEHOLDER")}
          />
        </Form.Item>
        <Form.Item name="customField2" label={t("CUSTOM_FIELD_2")}>
          <InputText
            maxLength={32}
            placeholder={t("CUSTOM_FIELD_2_PLACEHOLDER")}
          />
        </Form.Item>
        <Form.Item>
          <Row justify="center">
            <Space direction="horizontal" size="middle" align="center">
              <LinkButton onClick={onClose}>{t("common:CANCEL")}</LinkButton>
              <PrimaryButton
                loading={pending}
                size="middle"
                block={false}
                htmlType="submit"
              >
                {t(id ? "common:UPDATE" : "common:CREATE")}
              </PrimaryButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </RegularModal>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  isModalVisible: state.employees.isModalVisible,
  initialValues: state.employees.initialValues,
  pending: state.employees.pending,
});

const mapDispatchToProps = {
  addEmployee: employeesActions.addEmployee,
  resetFormValues: employeesActions.resetFormValues,
  setModalVisible: employeesActions.setModalVisible,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const EmployeeModalComponentRedux = connector(EmployeeModalComponent);

export { EmployeeModalComponentRedux as EmployeeModalComponent };
