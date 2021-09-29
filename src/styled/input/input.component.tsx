import React from "react";
import { DatePicker, DatePickerProps, Input } from "antd";
import { InputProps } from "antd/lib/input";
import { RangePickerProps } from "antd/lib/date-picker";

import styles from "./input.module.css";

import { ReactComponent as Calendar } from "&assets/images/ic-calendar.svg";

const { RangePicker } = DatePicker;

const InputText = (props: InputProps) => (
  <Input className={styles.text} {...props} />
);

const InputPassword = (props: InputProps) => (
  <Input.Password className={styles.text} {...props} />
);

const InputDate = (props: DatePickerProps) => (
  <DatePicker className={styles.text} suffixIcon={<Calendar />} {...props} />
);
const InputDateRange = (props: RangePickerProps) => (
  <RangePicker className={styles.text} suffixIcon={<Calendar />} {...props} />
);

export { InputText, InputPassword, InputDate, InputDateRange };
