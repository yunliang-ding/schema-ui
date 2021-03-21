import React from 'react';
import {
  Input,
  DatePicker,
  Select,
  TimePicker,
  Radio,
  Checkbox,
  InputNumber,
} from 'antd';
import {
  Render,
  BetweenValue,
} from '@/components';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
export default (field: any, formInstance: any = {}) => {
  switch (field.type) {
    case 'Input': {
      return <Input {...field.props} />;
    }
    case 'InputNumber': {
      return <InputNumber {...field.props} />;
    }
    case 'TextArea': {
      return <TextArea {...field.props} />;
    }
    case 'Select': {
      return <Select {...field.props} />;
    }
    case 'DatePicker': {
      return <DatePicker {...field.props} />;
    }
    case 'TimePicker': {
      return <TimePicker {...field.props} />;
    }
    case 'TimeRange': {
      return <TimePicker.RangePicker {...field.props} />;
    }
    case 'RadioGroup': {
      return <Radio.Group {...field.props} />;
    }
    case 'CheckGroup': {
      return <Checkbox.Group {...field.props} />;
    }
    case 'DateRange': {
      return <RangePicker {...field.props} />;
    }
    case 'Render': {
      return <Render render={field.render} {...field.props} />;
    }
    case 'BetweenValue': {
      return (
        <BetweenValue {...field.props} name={field.name} form={formInstance} />
      );
    }
    default:
      return null;
  }
};
