import React from "react";
import { FormSubmitSimple } from "@/components";
export default (props: any) => {
  const { entity, schemas, close, onRefresh } = props;
  return (
    <FormSubmitSimple
      formSchema={schemas.form}
      onClose={close}
      onRefresh={onRefresh}
      initialValues={entity}
    />
  );
};
