import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dropdown, Menu, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/lib/table";
import { usePromiseTracker } from "react-promise-tracker";

import { BranchRecord } from "./index.d";
import { RootState } from "&store/store";
import { branchesActions } from "./branches.slice";
import { BranchModalComponent } from "./branchModal.component";
import { TableComponent, TableWrapper } from "&styled/table/table.component";
import { H2 } from "&styled/typography/typography.component";
import { PrimaryButton } from "&styled/button/button.component";
import { TableSearchBar } from "&styled/search/search.component";
import { filterBranchesOnChange } from "&utils/filter";

import { ReactComponent as Options } from "&assets/images/ic-more.svg";
import { ReactComponent as Plus } from "&assets/images/ic-plus-white.svg";

type ReduxProps = ConnectedProps<typeof connector>;

const BranchesComponent = (props: ReduxProps) => {
  const { t } = useTranslation(["branches", "common"]); // Make sure namespace is added to locales
  const { promiseInProgress } = usePromiseTracker();

  const { data, pending, getBranches, setFormValues, setModalVisible } = props;

  useEffect(() => {
    getBranches();
  }, [getBranches]);

  useEffect(() => {
    setSearchableList(data);
  }, [data]);

  const [searchableList, setSearchableList] = useState(data);

  const columns: ColumnsType<BranchRecord> = [
    {
      title: t("NAME").toUpperCase(),
      dataIndex: "name",
      key: "name",
      align: "left",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t("COUNTRY").toUpperCase(),
      dataIndex: "country",
      key: "country",
      align: "left",
      sorter: (a, b) => a.country.localeCompare(b.name),
    },
    {
      title: t("CITY").toUpperCase(),
      dataIndex: "city",
      key: "city",
      align: "left",
      sorter: (a, b) => a.city.localeCompare(b.name),
    },
  ];

  const onEditBranch = (id: string) => {
    setFormValues(data?.find((item) => item._id === id));
    setModalVisible(true);
  };

  const renderOptions = (id: string) => (
    <Menu>
      <Menu.Item key="1" onClick={() => onEditBranch(id)}>
        {t("common:EDIT")}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row justify="space-between">
        <H2>{t("common:BRANCHES")}</H2>
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
          onChange={(e) => setSearchableList(filterBranchesOnChange(e, data))}
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
      <BranchModalComponent />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  data: state.branches.data,
  pending: state.branches.pending,
});

const mapDispatchToProps = {
  getBranches: branchesActions.getBranches,
  setFormValues: branchesActions.setFormValues,
  setModalVisible: branchesActions.setModalVisible,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const BranchesComponentRedux = connector(BranchesComponent);

export { BranchesComponentRedux as BranchesComponent };
