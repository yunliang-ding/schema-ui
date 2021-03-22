import { Table } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import ToolBar from './toolbar';
import { debounce } from '@/util';
import getRowOperations from './row-operations';
import './index.less';
const $: any = document.querySelector.bind(document);
export default (props: any) => {
  const {
    rowKey = 'id', // String, table的唯一标识，默认'id'
    request = function() {}, // 一个获取dataSource的方法 async
    payload = {}, // Object, 请求参数
    refresh = false, // Boolean，默认false, 变化则刷新列表
    columns, // Array, 表头数组
    onLoad = () => {}, // 数据请求之后的回调
    onQuery = () => {}, // 开始查询数据
    tools = [], // 顶部工具栏配置
    toolsClick = function() {}, // 顶部工具栏点击回调
    searchId, // 绑定在一起的查询框ID
    rowOperations, // 行操作选项
    rowOperationsClick = function() {}, // 行操作选项点击回调
    heightChange, // 高度变化重新设置
    filterIds = [], // 默认过滤字段
    tableScrollHeight, // 外围高度
    ...restProp
  } = props;
  const [loading, setloading] = useState(false);
  const [_columns, setcolumns] = useState(columns);
  useEffect(() => {
    setcolumns(columns);
  }, [columns]);
  const [dataSource, setdataSource] = useState([]);
  const [pagination, setpagination]: any = useState({
    current: 1,
    pageSize: 10,
    total: 1,
    pageSizeOptions: [10, 40, 60],
  });
  const [height, setheight] = useState(200);
  const query = async (paginationChange: any = false) => {
    onQuery(); // 开始查询
    setloading(true);
    const data = paginationChange
      ? Object.assign(payload, {
          pageSize: pagination.pageSize,
          pageNum: pagination.current,
        })
      : Object.assign(
          {
            pageSize: pagination.pageSize,
            pageNum: pagination.current,
          },
          payload,
        );
    const result = await request(data); // 调用外部提供的查询数据方法
    onLoad(result); // 吐出返回结果
    setTimeout(() => {
      setloading(false);
      if (result) {
        if (result.count > 0) {
          setpagination({
            current: result.currentPage,
            pageSize: result.numsPerPage,
            total: result.count,
          });
        }
        setdataSource(Array.isArray(result) ? result : result.data);
      } else {
        pagination.total = 0;
        setpagination({ ...pagination });
        setdataSource([]);
      }
    }, 100);
  };
  useEffect(() => {
    query();
  }, [refresh]);
  /**heightChange */
  const sizeChange = () => {
    let height = tableScrollHeight + 58 + 100;
    if ($(`#${searchId}`)) {
      height += $(`#${searchId}`).getBoundingClientRect().height;
    }
    console.log('height', height);
    setheight($(`body`).getBoundingClientRect().height - height);
  };
  useEffect(() => {
    const resizeCallBack = debounce(() => {
      sizeChange();
    }, 100);
    window.addEventListener('resize', resizeCallBack);
    return () => {
      window.removeEventListener('resize', resizeCallBack);
    };
  }, []);
  useEffect(() => {
    sizeChange();
  }, [heightChange]);
  /**rowOperations */
  const rowOperationsColumns = getRowOperations({
    rowOperations,
    rowOperationsClick,
  });
  const lastColumns =
    rowOperationsColumns && dataSource.length > 0
      ? [..._columns, rowOperationsColumns]
      : _columns;
  return (
    <div className="app-table-form">
      <ToolBar
        payload={payload}
        _columns={_columns}
        columns={columns}
        tools={tools}
        onRefresh={query}
        filterIds={filterIds}
        onFilter={(filterIds: any) => {
          setcolumns(
            columns.filter((item: any) => !filterIds.includes(item.dataIndex)),
          );
        }}
        toolsClick={(tool: any) => {
          toolsClick(tool);
        }}
      />
      <Table
        rowKey={rowKey}
        dataSource={dataSource}
        columns={lastColumns}
        loading={loading}
        scroll={{
          y: height,
          x: 'max-content',
        }}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: Number) => `共 ${total} 条`,
          onShowSizeChange: (current: any, pageSize: any) => {
            pagination.pageSize = pageSize;
            query(true);
          },
          onChange: (current: any) => {
            pagination.current = current;
            query(true);
          },
        }}
        {...restProp}
      />
    </div>
  );
};
