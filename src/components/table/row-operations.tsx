import { Menu, Button, Dropdown, Popconfirm } from 'antd';
import IconFont from '@/util/icon';
import React from 'react';
export default ({ rowOperations, rowOperationsClick = () => {} }: any) => {
  if (typeof rowOperations !== 'function') {
    return false;
  }
  return {
    title: '',
    dataIndex: '_operations19930226',
    fixed: 'right',
    width: 80,
    render: (_operations19930226: any, record: any) => {
      let menus: any = rowOperations(record);
      if (!Array.isArray(menus) || menus.length === 0) {
        return;
      }
      const menuItems = menus.map((menu: any) => {
        return (
          <Menu.Item key={menu.value}>
            {menu.type === 'confirm' ? (
              <Popconfirm
                trigger={['hover']}
                placement={menu.placement || 'left'}
                disabled={menu.disabled}
                title={menu.title || '是否确定删除?'}
                onConfirm={() => {
                  rowOperationsClick(menu, record);
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button disabled={menu.disabled} type="link">
                  <IconFont style={{ marginRight: 6 }} type={menu.icon} />
                  {menu.label}
                </Button>
              </Popconfirm>
            ) : (
              <Button
                disabled={menu.disabled}
                type="link"
                onClick={() => {
                  rowOperationsClick(menu, record);
                }}
              >
                <IconFont style={{ marginRight: 6 }} type={menu.icon} />
                {menu.label}
              </Button>
            )}
          </Menu.Item>
        );
      });
      return (
        <>
          <Dropdown arrow overlay={<Menu>{menuItems}</Menu>}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              操作
              <IconFont style={{ fontSize: 16 }} type="icon-xialadown" />
            </a>
          </Dropdown>
        </>
      );
    },
  };
};
