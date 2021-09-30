import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Row, Space } from "antd";

import { RootState } from "&store/store";
import { employeesActions } from "./employees.slice";
import { LinkButton, PrimaryButton } from "&styled/button/button.component";
import { H2 } from "&styled/typography/typography.component";
import { RegularModal } from "&styled/modal/modal.component";
import { InputText, InputDate } from "&styled/input/input.component";
import { Select, Option } from "&styled/select/select.component";
import moment from "moment";

type ReduxProps = ConnectedProps<typeof connector>;

const EmployeeModalComponent = (props: ReduxProps) => {
  const { t } = useTranslation(["employees", "common"]); // Make sure namespace is added to locales
  const [form] = Form.useForm();

  const {
    departments,
    branches,
    isModalVisible,
    setModalVisible,
    initialValues,
    addEmployee,
    updateEmployee,
    resetFormValues,
    pending,
  } = props;

  const { _id } = initialValues;

  useEffect(() => {
    if (isModalVisible) form.resetFields();
  }, [form, isModalVisible]);

  useEffect(() => {}, [_id]);

  const onFinish = async (values: any) => {
    _id ? await updateEmployee({ _id, ...values }) : await addEmployee(values);
    onClose();
  };

  const onClose = () => {
    resetFormValues();
    setModalVisible(false);
  };

  const handleDateFormat = ({ dateOfBirth, ...values }: any) => {
    return { dateOfBirth: moment(dateOfBirth), ...values };
  };

  return (
    <RegularModal visible={isModalVisible}>
      <Form
        form={form}
        name="employee"
        layout="vertical"
        requiredMark={"optional"}
        initialValues={handleDateFormat(initialValues)}
        onFinish={onFinish}
      >
        <H2>{_id ? t("EMPLOYEE_ID", { _id }) : t("ADD_EMPLOYEE")}</H2>
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
              maxLength={30}
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
            <InputText
              maxLength={30}
              placeholder={t("LAST_NAME_PLACEHOLDER")}
            />
          </Form.Item>
        </Row>
        <Form.Item
          name="email"
          label={t("EMAIL")}
          rules={[
            {
              required: true,
              message: t("common:REQUIRED_ERROR_MESSAGE", {
                fieldName: t("EMAIL").toLowerCase(),
              }),
            },
          ]}
        >
          <InputText maxLength={20} placeholder={t("EMAIL_PLACEHOLDER")} />
        </Form.Item>
        <Form.Item
          name="phone"
          label={t("PHONE")}
          rules={[
            {
              required: true,
              message: t("common:REQUIRED_ERROR_MESSAGE", {
                fieldName: t("PHONE").toLowerCase(),
              }),
            },
          ]}
        >
          <InputText
            maxLength={15}
            placeholder={t("PHONE_NUMBER_PLACEHOLDER")}
          />
        </Form.Item>

        <Row justify="space-between">
          <Form.Item
            name="salary"
            label={t("SALARY")}
            rules={[
              {
                required: true,
                message: t("common:REQUIRED_ERROR_MESSAGE", {
                  fieldName: t("SALARY").toLowerCase(),
                }),
              },
            ]}
          >
            <InputText maxLength={20} placeholder={t("SALARY_PLACEHOLDER")} />
          </Form.Item>
          <Form.Item
            name="annualLeaves"
            label={t("ANNUAL_LEAVES")}
            rules={[
              {
                required: true,
                message: t("common:REQUIRED_ERROR_MESSAGE", {
                  fieldName: t("ANNUAL_LEAVES").toLowerCase(),
                }),
              },
            ]}
          >
            <InputText
              maxLength={20}
              placeholder={t("ANNUAL_LEAVES_PLACEHOLDER")}
            />
          </Form.Item>
        </Row>
        <Form.Item
          name="dateOfBirth"
          label={t("DATE_OF_BIRTH")}
          rules={[
            {
              required: true,
              message: t("common:REQUIRED_ERROR_MESSAGE", {
                fieldName: t("DATE_OF_BIRTH").toLowerCase(),
              }),
            },
          ]}
        >
          <InputDate />
        </Form.Item>
        <Form.Item
          name="departmentId"
          label={t("DEPARTMENT")}
          rules={[
            {
              required: true,
              message: t("common:REQUIRED_ERROR_MESSAGE", {
                fieldName: t("DEPARTMENT").toLowerCase(),
              }),
            },
          ]}
        >
          <Select>
            {departments.map(({ _id, name }) => (
              <Option value={_id}>{name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="branchId"
          label={t("BRANCH")}
          rules={[
            {
              required: true,
              message: t("common:REQUIRED_ERROR_MESSAGE", {
                fieldName: t("BRANCH").toLowerCase(),
              }),
            },
          ]}
        >
          <Select>
            {branches.map(({ _id, name }) => (
              <Option value={_id}>{name}</Option>
            ))}
          </Select>
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
                {t(_id ? "common:UPDATE" : "common:CREATE")}
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
  departments: state.departments.data,
  branches: state.branches.data,
  isModalVisible: state.employees.isModalVisible,
  initialValues: state.employees.initialValues,
  countries: state.employees.countries,
  pending: state.employees.pending,
});

const mapDispatchToProps = {
  addEmployee: employeesActions.addEmployee,
  updateEmployee: employeesActions.updateEmployee,
  resetFormValues: employeesActions.resetFormValues,
  setModalVisible: employeesActions.setModalVisible,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const EmployeeModalComponentRedux = connector(EmployeeModalComponent);

export { EmployeeModalComponentRedux as EmployeeModalComponent };
