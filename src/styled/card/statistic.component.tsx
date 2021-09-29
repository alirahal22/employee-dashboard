import React from "react";

import styles from "./card.module.css";

import { ReactComponent as Move } from "&assets/images/ic-move.svg";
import { ReactComponent as Info } from "&assets/images/ic-information.svg";
import { Row, Skeleton, Tooltip } from "antd";

interface Props {
  title: string;
  subtitle: string;
  description?: string;
  highlight: string;
  variation?: string;
  note: string;
}

const Statistic = (props: Props) => {
  const { title, description, subtitle, highlight, variation, note } = props;
  let _variation = variation;
  let _percentage = Number(variation);

  if (_percentage < 0) {
    _variation += "% ▼";
  }
  if (_percentage > 0) {
    _variation += "% ▲";
  }

  return (
    <div className={styles.container}>
      <Row justify="end" align="top" className={styles.drag}>
        <Move />
      </Row>
      <Row justify="start" align="middle">
        <p className={styles.title}>{title}</p>
        <Tooltip title={description} placement="bottom">
          <Info className={styles.info} />
        </Tooltip>
      </Row>
      <Row justify="start">
        <p
          className={styles.subtitle}
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      </Row>
      <Row justify="start" align="middle">
        <p className={styles.highlight}>{highlight || "-- "}</p>
        {variation ? (
          <p
            className={
              _percentage === 0
                ? styles.zero
                : _percentage < 0
                ? styles.negative
                : styles.positive
            }
          >
            {_variation}
          </p>
        ) : (
          ""
        )}
      </Row>
      <Row justify="start">
        <p className={styles.note}>{note}</p>
      </Row>
    </div>
  );
};

const StatisticSkeleton = () => (
  <div className={styles.container}>
    <Skeleton active />
  </div>
);

export { Statistic, StatisticSkeleton };
