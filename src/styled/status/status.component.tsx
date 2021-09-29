import React from "react";
import { Tag } from "antd";

interface StatusTagProps {
  type:
    | "PAID"
    | "SENT"
    | "DRAFT"
    | "ACTIVE"
    | "PAUSED"
    | "COMPLETED"
    | "OVERDUE";
}

const tags = {
  PAID: <Tag color="success">PAID</Tag>,
  SENT: <Tag color="processing">SENT</Tag>,
  PENDING: <Tag color="processing">PENDING</Tag>,
  DRAFT: <Tag color="warning">DRAFT</Tag>,
  ACTIVE: <Tag color="success">ACTIVE</Tag>,
  UNKOWN: <Tag color="error">UNKOWN</Tag>,
  PAUSED: <Tag color="error">PAUSED</Tag>,
  COMPLETED: <Tag color="success">COMPLETED</Tag>,
  OVERDUE: <Tag color="warning">OVERDUE</Tag>,
};

const StatusTag = ({ type }: StatusTagProps) => tags[type];

interface AmountTagProps {
  amount: string;
}

const AmountTag = ({ amount }: AmountTagProps) =>
  amount.toString().charAt(0) !== "-" ? (
    <Tag color="success">{amount}</Tag>
  ) : (
    <Tag color="error">{amount}</Tag>
  );

export { StatusTag, AmountTag };
