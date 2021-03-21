import React, { useState } from 'react';
import { Checkbox, Menu, Dropdown, Button } from 'antd';
export default ({ filterIds = [], columns = [], onOk = () => {} }: any) => {
  const [visible, setvisible] = useState(false);
  const [values, setvalues]: any = useState(filterIds);
  const handleVisibleChange = (visible: boolean) => {
    setvisible(visible);
  };
  const menu = (
    <>
      <Menu style={{ height: 220, overflow: 'auto' }}>
        {columns
          .filter((item: any) => item.dataIndex !== '_operations19930226')
          .map((column: any) => {
            return (
              <Menu.Item key={column.dataIndex} style={{ margin: 0 }}>
                <Checkbox
                  checked={!values.includes(column.dataIndex)}
                  onChange={() => {
                    let index = values.findIndex(
                      (item: any) => item === column.dataIndex,
                    );
                    if (index > -1) {
                      values.splice(index, 1);
                    } else {
                      values.push(column.dataIndex);
                    }
                    setvalues([...values]);
                  }}
                >
                  {column.title}
                </Checkbox>
              </Menu.Item>
            );
          })}
      </Menu>
      <div
        style={{
          height: 50,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #f5f5f5',
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            setvisible(false);
            onOk(values);
          }}
        >
          确定
        </Button>
      </div>
    </>
  );
  return (
    <Dropdown
      onVisibleChange={handleVisibleChange}
      visible={visible}
      arrow
      overlay={menu}
      trigger={['click']}
    >
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        筛选
      </a>
    </Dropdown>
  );
};
