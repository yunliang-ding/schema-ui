import React, { useRef } from "react";
import { Button } from "antd";
import { Form } from "@/components";
import { Modal } from "antd";
import "./index.less";
export default ({
  formSchema,
  onSubmit = function () {},
  onClose = function () {},
  loading = false,
  initialValues = {},
}: any) => {
  const formRef: any = useRef({});
  const {
    fields,
    action,
    formName,
    formTitle,
    labelCol,
    wrapperCol,
    formWidth,
  } = formSchema;
  const onOk = async () => {
    try {
      const values = await formRef.current.submit(); // 提交
      onSubmit({
        ...initialValues,
        ...values,
      });
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };
  return (
    <Modal
      title={initialValues.id ? `编辑${formTitle}` : `添加${formTitle}`}
      width={formWidth * 2}
      onCancel={onClose}
      wrapClassName="common-form-modal"
      visible
      footer={
        <>
          <Button type="primary" onClick={onOk} loading={loading}>
            保存
          </Button>
          <Button onClick={onClose}>关闭</Button>
        </>
      }
    >
      <Form
        name={formName}
        layout="inline"
        formRef={formRef}
        fields={fields}
        action={action}
        initialValues={initialValues}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      />
    </Modal>
  );
};
