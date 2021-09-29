import React, { ReactNode } from "react";
import Text, { TextProps } from "antd/lib/typography/Text";

import styles from "./typography.module.css";

const H1 = ({ children }: { children: ReactNode }) => (
  <h1 className={styles.h1}>{children}</h1>
);

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className={styles.h2}>{children}</h2>
);

const SubTitle = (props: TextProps) => (
  <Text className={styles.subtitle} {...props} />
);

export { H1, H2, SubTitle };
