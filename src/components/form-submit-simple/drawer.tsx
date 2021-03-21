import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { Form, Drawer } from '@/components';
export default ({
  formSchema,
  onClose = function() {},
  onRefresh = function() {},
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
    request,
  } = formSchema;
  const [loading, setloading] = useState(false);
  const onOk = async () => {
    try {
      const values = await formRef.current.submit(); // 提交
      setloading(true);
      const result = await request({
        ...initialValues,
        ...values,
      });
      setloading(false);
      if (result) {
        onClose();
        onRefresh();
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  return (
    <Drawer
      title={initialValues.id ? `编辑${formTitle}` : `添加${formTitle}`}
      drawerWidth={formWidth}
      onClose={onClose}
      content={
        <Form
          name={formName}
          formRef={formRef}
          fields={fields}
          action={action}
          initialValues={initialValues}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        />
      }
      footer={
        <>
          <Button type="primary" onClick={onOk} loading={loading}>
            保存
          </Button>
          <Button onClick={onClose}>关闭</Button>
        </>
      }
    />
  );
};
