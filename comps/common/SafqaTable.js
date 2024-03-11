import { Table } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SafqaTable = ({
  dataSource,
  loading,
  columns,
  pageSize,
  rowSelection,
}) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  // const newDataSource = dataSource?.map(item => {
  //     return { ...item, key: item?.id }
  // })

  let newDataSource = dataSource?.length
    ? [...dataSource].reverse()
    : dataSource;
  // newDataSource = newDataSource;

  return (
    <Table
      pagination={{
        position: [`bottomLeft`],
        pageSize: pageSize,
      }}
      loading={loading}
      dataSource={newDataSource}
      columns={columns}
      className={language == "ar" && "ar-antd-table"}
      rowSelection={rowSelection}
      rowKey={"id"}
    />
  );
};

export default SafqaTable;
