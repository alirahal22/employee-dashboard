import React from "react";
import { AutoComplete, AutoCompleteProps, Input, InputProps } from "antd";

import styles from "./search.module.css";

import { ReactComponent as SearchIcon } from "&assets/images/ic-search.svg";

const SearchBar = ({ placeholder, ...props }: AutoCompleteProps) => (
  <AutoComplete
    className={styles.bar}
    filterOption={(inputValue, option) =>
      option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
    {...props}
  >
    <Input
      size="large"
      className={styles.search}
      placeholder={placeholder as string}
      prefix={<SearchIcon />}
    />
  </AutoComplete>
);

const TableSearchBar = (props: InputProps) => (
  <Input className={styles.tablesearchbar} prefix={<SearchIcon />} {...props} />
);

export { SearchBar, TableSearchBar };
