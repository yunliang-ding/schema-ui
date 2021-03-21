import React from "react";
import { TableSearch, FormSubmitSimple, SimplePage } from "@/components";
const Page = (props: any) => {
  const { setentity, open, schemas, refresh, setRefresh } = props;
  const toolsClick = (e: any) => {
    if (e.value === "add") {
      setentity({});
      open("formPage");
    }
  };
  const rowOperationsClick = (e: any, record: any) => {
    if (e.value === "edit") {
      setentity(record);
      open("formPage");
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
      reload={refresh}
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
const Form = (props: any) => {
  const { entity, schemas, close, onRefresh} = props;
  console.log(props);
  return (
    <FormSubmitSimple
      formSchema={schemas.form}
      onClose={close}
      onRefresh={onRefresh}
      initialValues={entity}
    />
  );
};
export default SimplePage({
  schemas: {
    search: "schema/account/search.ts",
    table: "schema/account/table.ts",
    form: "schema/account/form.ts",
  },
})(Page, {
  formPage: Form,
});
