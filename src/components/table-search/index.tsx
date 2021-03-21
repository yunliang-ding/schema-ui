import React, { useState, useEffect } from 'react';
import { Search, Table } from '@/components';
export default ({
  fields = [],
  initialSearchValue = {},
  rowKey = 'id',
  request,
  columns = [],
  tools = [],
  toolsClick = () => {},
  reload = false,
  searchRef = {},
  tableScrollHeight,
  ...restProps
}: any) => {
  /**update */
  useEffect(() => {
    setrefresh(!refresh);
  }, [reload]);
  const [refresh, setrefresh] = useState(false);
  const [heightChange, setheightChange] = useState(false);
  const [payload, setpayload]: any = useState(initialSearchValue);
  /**search */
  const onSearch = (payload: any) => {
    setloading(true);
    setpayload({ ...initialSearchValue, ...payload });
    setrefresh(!refresh);
  };
  // 生成唯一的ID
  const [thisId] = useState(
    'table-search-' + (Math.random() * 10).toString(18).substr(2),
  );
  useEffect(() => {
    // 获取已经选中的查询条件
    searchRef.current = {
      getParams: () => {
        return payload;
      },
    };
  }, [payload]);
  const [loading, setloading] = useState(false);
  const queryOver = () => {
    setTimeout(() => {
      setloading(false);
    }, 200);
  };
  return (
    <>
      <Search
        id={thisId}
        fields={fields}
        loading={loading}
        onExpand={setheightChange.bind(null, !heightChange)}
        onSearch={onSearch}
      />
      <Table
        rowKey={rowKey}
        onQuery={setloading.bind(null, true)}
        onLoad={queryOver}
        payload={payload}
        refresh={refresh}
        tableScrollHeight={tableScrollHeight}
        heightChange={heightChange}
        request={request}
        columns={columns}
        searchId={thisId}
        tools={tools}
        toolsClick={toolsClick}
        {...restProps}
      />
    </>
  );
};
