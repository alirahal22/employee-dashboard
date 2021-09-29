import React from "react";
import { Button, Space } from "antd";
import { NativeButtonProps } from "antd/lib/button/button";

import styles from "./button.module.css";

const sizes = { small: "28px", middle: "38px", large: "50px" };

const PrimaryButton = ({
  size = "large",
  icon,
  children,
  ...props
}: NativeButtonProps) => (
  <Button
    block
    style={{ height: sizes[size] }}
    type="primary"
    className={styles.primary}
    {...props}
  >
    <Space direction="horizontal">
      {icon}
      {children}
    </Space>
  </Button>
);

const SecondaryButton = ({
  size = "large",
  icon,
  children,
  ...props
}: NativeButtonProps) => (
  <Button
    style={{ height: sizes[size] }}
    className={styles.secondary}
    {...props}
  >
    <Space direction="horizontal">
      {icon}
      {children}
    </Space>
  </Button>
);

const LinkButton = (props: NativeButtonProps) => (
  <Button type="link" className={styles.link} {...props} />
);

export { PrimaryButton, LinkButton, SecondaryButton };
