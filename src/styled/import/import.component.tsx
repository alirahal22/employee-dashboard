import React, { PropsWithChildren } from "react";
import { Upload, UploadProps } from "antd";
import csv from "csvtojson";

export const ImportCsv = ({
  callback,
  children,
  ...props
}: UploadProps & PropsWithChildren<any>) => (
  <Upload
    accept=".csv"
    showUploadList={false}
    beforeUpload={(file) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const csvString = e?.target?.result as string;
        const jsonArray = await csv({ trim: true }).fromString(csvString);
        callback(jsonArray);
      };
      reader.readAsText(file);
      return false;
    }}
    {...props}
  >
    {children}
  </Upload>
);
