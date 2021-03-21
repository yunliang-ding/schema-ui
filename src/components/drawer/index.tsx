import React from 'react';
import { Drawer } from 'antd';
import './index.less';
export default ({
  title,
  drawerWidth,
  footer,
  closable = true,
  placement = 'right',
  onClose = function() {},
  content,
}: any) => {
  return (
    <Drawer
      className="app-common-drawer"
      closable={closable}
      title={title}
      width={drawerWidth}
      footer={footer}
      placement={placement}
      visible
      onClose={onClose}
    >
      {content}
    </Drawer>
  );
};
