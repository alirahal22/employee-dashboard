import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Row, Space } from "antd";

import { RootState } from "&store/store";
import { departmentsActions } from "./departments.slice";
import { LinkButton, PrimaryButton } from "&styled/button/button.component";
import { H2 } from "&styled/typography/typography.component";
import { RegularModal } from "&styled/modal/modal.component";
import { InputText } from "&styled/input/input.component";

type ReduxProps = ConnectedProps<typeof connector>;

const DepartmentModalComponent = (props: ReduxProps) => {
  const { t } = useTranslation(["departments", "common"]); // Make sure namespace is added to locales
  const [form] = Form.useForm();

  const {
    isModalVisible,
    setModalVisible,
    initialValues,
    addDepartment,
    updateDepartment,
    resetFormValues,
    pending,
  } = props;

  const { _id } = initialValues;

  useEffect(() => {
    if (isModalVisible) form.resetFields();
  }, [form, isModalVisible]);

  const onFinish = async (values: any) => {
    _id
      ? await updateDepartment({ _id, ...values })
      : await addDepartment(values);
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
        name="department"
        layout="vertical"
        requiredMark={"optional"}
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <H2>{_id ? t("EDIT_DEPARTMENT", { _id }) : t("ADD_DEPARTMENT")}</H2>
        <Form.Item
          name="name"
          label={t("NAME")}
          rules={[
            {
              required: true,
              message: t("common:REQUIRED_ERROR_MESSAGE", {
                fieldName: t("NAME").toLowerCase(),
              }),
            },
          ]}
        >
          <InputText maxLength={30} placeholder={t("NAME_PLACEHOLDER")} />
        </Form.Item>
        <Form.Item
          name="description"
          label={t("DESCRIPTION")}
          rules={[
            {
              required: true,
              message: t("common:REQUIRED_ERROR_MESSAGE", {
                fieldName: t("DESCRIPTION").toLowerCase(),
              }),
            },
          ]}
        >
          <InputText placeholder={t("DESCRIPTION_PLACEHOLDER")} />
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
  isModalVisible: state.departments.isModalVisible,
  initialValues: state.departments.initialValues,
  pending: state.departments.pending,
});

const mapDispatchToProps = {
  addDepartment: departmentsActions.addDepartment,
  updateDepartment: departmentsActions.updateDepartment,
  resetFormValues: departmentsActions.resetFormValues,
  setModalVisible: departmentsActions.setModalVisible,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const DepartmentModalComponentRedux = connector(DepartmentModalComponent);

export { DepartmentModalComponentRedux as DepartmentModalComponent };
