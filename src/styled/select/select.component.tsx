import { Select as AntdSelect } from "antd";
import { SelectProps } from "antd/lib/select";
import React from "react";

import styles from "./select.module.css";

const Option = AntdSelect.Option;

const Select = ({ children, ...props }: SelectProps<string>) => (
  <AntdSelect className={styles.select} {...props}>
    {children}
  </AntdSelect>
);

const CountryCodeSelect = (props: SelectProps<string>) => (
  <Select {...props}>
    {require("&config/countryCodes").map(
      (countryCode: { name: string; dial_code: string; code: string }) => (
        <AntdSelect.Option key={countryCode.code} value={countryCode.dial_code}>
          {countryCode.dial_code}
        </AntdSelect.Option>
      )
    )}
  </Select>
);

export { Select, CountryCodeSelect, Option };
