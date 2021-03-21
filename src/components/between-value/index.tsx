import React, { useEffect, useState } from "react";
import { Input, InputNumber } from "antd";
import "./index.less";
export default (props: any) => {
  const {
    form: { setFieldsValue, getFieldValue, initialValues },
    name,
  } = props;
  const [values] = useState(initialValues[name] || [])
  const setFields = () => {
    setFieldsValue({ ...getFieldValue(), [name]: values });
  };
  const changeValue = (index: any, value: any) => {
    values[index] = value;
    setFields();
  };
  useEffect(() => {
    setFields();
  }, []);
  return (
    <div className="schema-input-group-wrapper" {...props}>
      <Input.Group>
        <InputNumber
          {...(props.start || {})}
          defaultValue={values[0]}
          onChange={(e: any) => {
            changeValue(0, e);
          }}
        />
        <Input className="schema-input-split" placeholder="~" disabled />
        <InputNumber
          {...(props.end || {})}
          defaultValue={values[1]}
          onChange={(e: any) => {
            changeValue(1, e);
          }}
        />
      </Input.Group>
    </div>
  );
};
