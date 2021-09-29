import React from "react";
import { DatePicker, DatePickerProps, Select, SelectProps } from "antd";
import { RangePickerProps } from "antd/lib/date-picker/generatePicker";

import styles from "./filter.module.css";

import { ReactComponent as Calendar } from "&assets/images/ic-calendar.svg";

const { RangePicker } = DatePicker;

const SelectFilter = ({ children, ...props }: SelectProps<any>) => (
  <Select
    bordered={false}
    className={styles.input}
    defaultActiveFirstOption={true}
    {...props}
  >
    {children}
  </Select>
);

const DateFilter = (props: DatePickerProps) => (
  <DatePicker className={styles.input} suffixIcon={<Calendar />} {...props} />
);

const RangeFilter = (props: RangePickerProps<moment.Moment>) => (
  <RangePicker className={styles.input} suffixIcon={<Calendar />} {...props} />
);

export { SelectFilter, DateFilter, RangeFilter };
