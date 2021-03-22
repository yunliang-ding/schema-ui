import React from "react";
import { TableSearch } from "@/components";
export default (props: any) => {
  const { setentity, open, schemas, refresh, setRefresh } = props;
  const toolsClick = (e: any) => {
    if (e.value === "add") {
      setentity({});
      open("form");
    }
  };
  const rowOperationsClick = (e: any, record: any) => {
    if (e.value === "edit") {
      setentity(record);
      record.liked = record.liked.split(',').map((item:any) => Number(item)) // 格式转换
      open("form");
    } else if(e.value === "delete"){
      console.log('删除');
      e.onClick(record).then((res:any) => {
        if(res){
          setRefresh(!refresh) // 刷新列表
        }
      })
    }
  };
  return (
    <TableSearch
      rowKey="id"
      refresh={refresh}
      setRefresh={setRefresh}
      fields={schemas.search.fields}
      request={schemas.table.request}
      columns={schemas.table.columns}
      rowOperations={schemas.table.rowOperations}
      rowOperationsClick={rowOperationsClick}
      tools={schemas.table.tools}
      toolsClick={toolsClick}
      tableScrollHeight={schemas.table.tableScrollHeight}
    />
  );
};