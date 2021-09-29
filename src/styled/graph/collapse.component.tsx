import React, { ReactNode, useState } from "react";
import { Collapse, Divider, Skeleton, Space } from "antd";

import "./index.css";

import { ReactComponent as Arrow } from "&assets/images/ic-collpase-arrow-up.svg";

const { Panel } = Collapse;

interface GraphContainerProps {
  title: string;
  children: ReactNode;
  filters?: ReactNode[];
  pending?: boolean;
}

const generateFilters = (filters: ReactNode[]) => (
  <div
    onClick={(event) => {
      event.stopPropagation();
    }}
  >
    <Space split={<Divider type="vertical" />} direction="horizontal">
      {filters.map((filter, index) => (
        <div key={index}>{filter}</div>
      ))}
    </Space>
  </div>
);

const GraphCollapse = ({
  title,
  children,
  filters,
  pending = false,
}: GraphContainerProps) => {
  const key = "graph";
  const [expanded, setExpanded] = useState(true);

  return (
    <Collapse
      onChange={(keys) => setExpanded(keys.includes(key))}
      className="graph_collapse"
      defaultActiveKey="graph"
      expandIconPosition="right"
      expandIcon={() => (
        <div>
          <Arrow />
        </div>
      )}
    >
      <Panel
        key={key}
        header={<span className="collapse_header">{title}</span>}
        extra={filters && expanded && !pending && generateFilters(filters)}
      >
        {pending ? <Skeleton active /> : children}
      </Panel>
    </Collapse>
  );
};

export { GraphCollapse };
