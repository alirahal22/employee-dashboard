import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Input, Row, Space } from "antd";

import { RootState } from "&store/store";
import { formatPhone } from "&utils/format";
import { branchesActions } from "./branches.slice";
import { LinkButton, PrimaryButton } from "&styled/button/button.component";
import { H2 } from "&styled/typography/typography.component";
import { RegularModal } from "&styled/modal/modal.component";
import { InputText } from "&styled/input/input.component";
import { Select, Option } from "&styled/select/select.component";
import { employeesActions } from "&features/employees/employees.slice";

type ReduxProps = ConnectedProps<typeof connector>;

const BranchModalComponent = (props: ReduxProps) => {
  const { t } = useTranslation(["branches", "common"]); // Make sure namespace is added to locales
  const [form] = Form.useForm();

  const {
    cities,
    countries,
    selectedCountry,
    setSelectedCountry,
    isModalVisible,
    setModalVisible,
    initialValues,
    addBranch,
    getCountries,
    getCities,
    resetFormValues,
    pending,
  } = props;

  const { id } = initialValues;

  useEffect(() => {
    getCountries();
    getCities({ country: selectedCountry });
  }, [getCities, getCountries, selectedCountry]);

  useEffect(() => {
    if (isModalVisible) form.resetFields();
  }, [form, isModalVisible]);

  const onFinish = async (values: any) => {
    await addBranch(values);
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
        name="branch"
        layout="vertical"
        requiredMark={"optional"}
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <H2>{id ? t("BRANCH_ID", { id }) : t("ADD_BRANCH")}</H2>

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
          <InputText maxLength={20} placeholder={t("NAME_PLACEHOLDER")} />
        </Form.Item>

        <Form.Item
          name="country"
          label={t("COUNTRY")}
          rules={[
            {
              required: true,
              message: t("common:REQUIRED_ERROR_MESSAGE", {
                fieldName: t("COUNTRY").toLowerCase(),
              }),
            },
          ]}
        >
          <Select
            onChange={(value) => {
              setSelectedCountry(value);
            }}
          >
            {countries.map((country) => (
              <Option value={country}>{country}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="city"
          label={t("CITY")}
          rules={[
            {
              required: true,
              message: t("common:REQUIRED_ERROR_MESSAGE", {
                fieldName: t("CITY").toLowerCase(),
              }),
            },
          ]}
        >
          <Select>
            {cities?.length !== 0 &&
              cities.map((country) => (
                <Option value={country}>{country}</Option>
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
  isModalVisible: state.branches.isModalVisible,
  initialValues: state.branches.initialValues,
  cities: state.employees.cities,
  countries: state.employees.countries,
  selectedCountry: state.branches.selectedCountry,
  pending: state.branches.pending,
});

const mapDispatchToProps = {
  addBranch: branchesActions.addBranch,
  resetFormValues: branchesActions.resetFormValues,
  setSelectedCountry: branchesActions.setSelectedCountry,
  getCountries: employeesActions.getCountries,
  getCities: employeesActions.getCities,
  setModalVisible: branchesActions.setModalVisible,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const BranchModalComponentRedux = connector(BranchModalComponent);

export { BranchModalComponentRedux as BranchModalComponent };
