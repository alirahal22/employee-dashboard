import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dropdown, Menu, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/lib/table";
import { usePromiseTracker } from "react-promise-tracker";

import { EmployeeRecord } from "./index.d";
import { RootState } from "&store/store";
import { employeesActions } from "./employees.slice";
import { EmployeeModalComponent } from "./employeeModal.component";
import { TableComponent, TableWrapper } from "&styled/table/table.component";
import { H2 } from "&styled/typography/typography.component";
import { PrimaryButton } from "&styled/button/button.component";
import { TableSearchBar } from "&styled/search/search.component";
import { filterEmployeesOnChange } from "&utils/filter";

import { ReactComponent as Options } from "&assets/images/ic-more.svg";
import { ReactComponent as Plus } from "&assets/images/ic-plus-white.svg";

type ReduxProps = ConnectedProps<typeof connector>;

const EmployeesComponent = (props: ReduxProps) => {
  const { t } = useTranslation(["employees", "common"]); // Make sure namespace is added to locales
  const { promiseInProgress } = usePromiseTracker();

  const { data, pending, getEmployees, setFormValues, setModalVisible } = props;

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  useEffect(() => {
    setSearchableList(data);
  }, [data]);

  const [searchableList, setSearchableList] = useState(data);

  const columns: ColumnsType<EmployeeRecord> = [
    {
      title: t("FIRST_NAME").toUpperCase(),
      dataIndex: "firstName",
      key: "firstName",
      align: "left",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: t("LAST_NAME").toUpperCase(),
      dataIndex: "lastName",
      key: "lastName",
      align: "left",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: t("EMAIL").toUpperCase(),
      dataIndex: "email",
      key: "email",
      align: "left",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: t("PHONE").toUpperCase(),
      dataIndex: "phone",
      key: "phone",
      align: "left",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "",
      dataIndex: "options",
      key: "options",
      align: "center",
      width: 50,
    },
  ];

  const onEditEmployee = (id: string) => {
    setFormValues(data?.find((item) => item._id === id));
    setModalVisible(true);
  };

  const renderOptions = (id: string) => (
    <Menu>
      <Menu.Item key="1" onClick={() => onEditEmployee(id)}>
        {t("common:EDIT")}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row justify="space-between">
        <H2>{t("common:EMPLOYEES")}</H2>
        <Space align="start">
          <PrimaryButton
            disabled={promiseInProgress}
            size="middle"
            block={false}
            icon={<Plus />}
            onClick={() => setModalVisible(true)}
          >
            {t("common:NEW")}
          </PrimaryButton>
        </Space>
      </Row>
      <TableWrapper>
        <TableSearchBar
          disabled={data?.length <= 0}
          onChange={(e) => setSearchableList(filterEmployeesOnChange(e, data))}
          placeholder={t("SEARCH_PLACEHOLDER")}
        />
        <TableComponent
          loading={pending || promiseInProgress}
          columns={columns}
          dataSource={searchableList?.map(({ _id, ...item }) => ({
            key: _id,
            ...item,
            options: (
              <Dropdown overlay={renderOptions(_id)}>
                <Options />
              </Dropdown>
            ),
          }))}
        />
      </TableWrapper>
      <EmployeeModalComponent />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  data: state.employees.data,
  pending: state.employees.pending,
});

const mapDispatchToProps = {
  getEmployees: employeesActions.getEmployees,
  setFormValues: employeesActions.setFormValues,
  setModalVisible: employeesActions.setModalVisible,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const EmployeesComponentRedux = connector(EmployeesComponent);

export { EmployeesComponentRedux as EmployeesComponent };
