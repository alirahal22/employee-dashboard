import React, { ReactNode } from "react";
import { Table } from "ant-table-extensions";
import { TableProps } from "antd/lib/table";

import { Spinner } from "&styled/loader/loader.component";

import "./table.styled.css";

const TableComponent = ({ loading = false, ...props }: TableProps<any>) => {
  const tableLoading = {
    indicator: <Spinner />,
  };

  return (
    <Table
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 15,
        pageSizeOptions: ["5", "10", "20", "30", "40"],
        showSizeChanger: true,
        position: ["bottomRight"],
        locale: { items_per_page: "" },
      }}
      scroll={{ x: 500 }}
      loading={{ ...tableLoading, spinning: loading as boolean }}
      exportable
      {...props}
    />
  );
};

const TableWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="table-wrapper">{children}</div>;
};

export { TableComponent, TableWrapper };
