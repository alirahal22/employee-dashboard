import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dropdown, Menu, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/lib/table";
import { usePromiseTracker } from "react-promise-tracker";

import { DepartmentRecord } from "./index.d";
import { RootState } from "&store/store";
import { departmentsActions } from "./departments.slice";
import { DepartmentModalComponent } from "./departmentModal.component";
import { TableComponent, TableWrapper } from "&styled/table/table.component";
import { H2 } from "&styled/typography/typography.component";
import { PrimaryButton } from "&styled/button/button.component";
import { TableSearchBar } from "&styled/search/search.component";
import { filterDepartmentsOnChange } from "&utils/filter";

import { ReactComponent as Options } from "&assets/images/ic-more.svg";
import { ReactComponent as Plus } from "&assets/images/ic-plus-white.svg";

type ReduxProps = ConnectedProps<typeof connector>;

const DepartmentsComponent = (props: ReduxProps) => {
  const { t } = useTranslation(["departments", "common"]); // Make sure namespace is added to locales
  const { promiseInProgress } = usePromiseTracker();

  const {
    data,
    pending,
    getDepartments,
    setFormValues,
    setModalVisible,
  } = props;

  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

  useEffect(() => {
    setSearchableList(data);
  }, [data]);

  const [searchableList, setSearchableList] = useState(data);

  const columns: ColumnsType<DepartmentRecord> = [
    {
      title: t("NAME").toUpperCase(),
      dataIndex: "name",
      key: "name",
      align: "left",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t("DESCRIPTION").toUpperCase(),
      dataIndex: "description",
      key: "description",
      align: "left",
    },
    {
      title: "",
      dataIndex: "options",
      key: "options",
      align: "center",
      width: 50,
    },
  ];

  const onEditDepartment = (id: string) => {
    setFormValues(data?.find((item) => item._id === id));
    setModalVisible(true);
  };

  const renderOptions = (id: string) => (
    <Menu>
      <Menu.Item key="1" onClick={() => onEditDepartment(id)}>
        {t("common:EDIT")}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row justify="space-between">
        <H2>{t("common:DEPARTMENTS")}</H2>
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
          onChange={(e) =>
            setSearchableList(filterDepartmentsOnChange(e, data))
          }
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
      <DepartmentModalComponent />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  data: state.departments.data,
  pending: state.departments.pending,
});

const mapDispatchToProps = {
  getDepartments: departmentsActions.getDepartments,
  setFormValues: departmentsActions.setFormValues,
  setModalVisible: departmentsActions.setModalVisible,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const DepartmentsComponentRedux = connector(DepartmentsComponent);

export { DepartmentsComponentRedux as DepartmentsComponent };
