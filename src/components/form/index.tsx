import React from "react";
import { Form } from "antd";
import CreateSchemaForm from "@/util/create-schema-form";
import { deepClone } from "@/util";
import "./index.less";
export default ({
  fields = [],
  disabled = false,
  disabledFields = [],
  formRef,
  /** antd4-form */
  labelCol = { span: 4 },
  wrapperCol = { span: 20 },
  name = "",
  initialValues = {},
  onValuesChange = function () {},
  scrollToFirstError = true,
  ...restProps
}: any) => {
  const [form] = Form.useForm();
  fields = deepClone(fields); // deepClone 避免被污染
  // set disabled
  fields.map((field: any) => {
    if (disabledFields.includes(field.name) || disabled) {
      field.props.disabled = true;
    }
  });
  if (formRef && formRef.current && !formRef.current.form) {
    formRef.current = form;
    /**新增提交方法负责规则+处理组合字段等问题 */
    formRef.current.submit = async () => {
      try {
        const values = await formRef.current.validateFields(); // 校验
        /**处理组合name问题 */
        const combination: any = {}; // 组合参数
        Object.keys(values).map((name) => {
          const field = fields.find((field: any) => field.name === name);
          if (typeof field.transform === "function") {
            // 含有transform的字段格式需要处理
            Object.assign(combination, field.transform(values[name]));
            delete values[name]; // remove
          }
        });
        return { ...values, ...combination };
      } catch (errorInfo) {
        console.error("Failed:", errorInfo);
        throw errorInfo;
      }
    };
  }
  /**default values */
  const defaultValues: any = {};
  fields.map((field: any) => {
    if (field.props && field.props.value !== undefined) {
      defaultValues[field.name] = field.props.value;
    }
  });
  const [_initialValues, setinitialValues] = React.useState(initialValues);
  return (
    <Form
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      form={form}
      name={name}
      initialValues={{ ...initialValues, ...defaultValues }}
      onValuesChange={(value, values) => {
        // update 执行filter
        setinitialValues({ ...initialValues, ...defaultValues, ...values });
        onValuesChange(value, values);
      }}
      scrollToFirstError={scrollToFirstError}
      {...restProps}
    >
      {fields
        .filter((field: any) => {
          if (typeof field.isShow === "function") {
            return field.isShow(_initialValues);
          }
          return true;
        })
        .sort((a: any, b: any) => {
          return a.sort > b.sort ? 1 : -1;
        })
        .map((field: any) => {
          // 不需要绑定方法到 Form.Item
          const filterField = JSON.parse(JSON.stringify(field));
          return (
            <Form.Item {...filterField} key={field.name || field.key}>
              {CreateSchemaForm(field, {
                ...form,
                initialValues: { ...initialValues, ...defaultValues },
              })}
            </Form.Item>
          );
        })}
    </Form>
  );
};
