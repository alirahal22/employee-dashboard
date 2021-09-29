import React from "react";
import { Empty } from "antd";
import { Types } from "@antv/g2";
import Column from "rc-table/lib/sugar/Column";
import { ColumnConfig } from "@ant-design/charts/es/plots/column";
import Line, { LineConfig } from "@ant-design/charts/es/plots/line";

import { abbreviateNumber } from "&utils/format";

const xAxis: Types.AxisCfg = {
  grid: {
    line: {
      style: {
        stroke: "#f1f1f5",
        lineWidth: 1.4,
      },
    },
  },
  label: {
    style: {
      fontFamily: "Roboto-Regular",
      fontSize: 14,
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: 1.71,
      letterSpacing: "0.1px",
      textAlign: "center",
      color: "#92929d",
    },
  },
};

const yAxis: Types.AxisCfg = {
  grid: null,
  label: {
    formatter: abbreviateNumber,
    style: {
      fontFamily: "Roboto-Regular",
      fontSize: 14,
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: 1.71,
      letterSpacing: "0.1px",
      textAlign: "center",
      color: "#92929d",
    },
  },
};

const legend: Types.LegendCfg = {
  position: "bottom-left",
  itemHeight: 20,
  itemName: {
    style: {
      fontFamily: "Roboto-Regular",
      fontSize: 14,
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: 1.71,
      letterSpacing: "0.1px",
      color: "#44444f",
      textTransform: "lowercase",
    },
  },
  itemSpacing: 49,
};

const theme = {
  colors10: [
    "#24323e",
    "#ffc542",
    "#50b5ff",
    "#3dd598",
    "#FF974A",
    "#FE2728",
    "#82C43C",
    "#A461D8",
    "#FF9AD5",
  ],
};

const LineGraph = ({ data, ...props }: LineConfig) => {
  const config: LineConfig = {
    data,
    theme,
    xAxis,
    yAxis,
    legend,
    smooth: true,
    seriesField: "name",
    slider: {
      start: 0.3,
      end: 0.9,
    },
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };
  return data?.length > 0 ? (
    <Line {...config} {...props} />
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

const BarGraph = ({ data, ...props }: LineConfig) => {
  const config: ColumnConfig = {
    data,
    isGroup: true,
    maxColumnWidth: 7,
    marginRatio: 0,
    columnWidthRatio: 0.2,
    theme: { colors10: ["#3dd598", "#ffc542"] },
    xField: "",
    yField: "",
    xAxis,
    yAxis,
    legend,
    seriesField: "name",
  };
  return data?.length > 0 ? (
    <Column {...config} {...props} />
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

export { BarGraph, LineGraph };
