import React, { useState, useRef } from 'react';
import { Form } from '@/components';
import { deepClone } from '@/util';
import './index.less';
import IconFont from '@/util/icon';
import { Button } from 'antd';
export default ({
  layout = 'inline',
  labelCol = { span: 8 },
  wrapperCol = { span: 16 },
  fields,
  onSearch,
  id,
  loading,
  onExpand,
  ...restProps
}: any) => {
  fields = deepClone(fields); // deepClone 避免被污染
  const formRef: any = useRef({});
  const [expand, setexpand] = useState(true);
  const [more, setmore] = useState(false);
  /**search */
  const search = async () => {
    const values = await formRef.current.submit(); // 提交
    onSearch({ ...values, pageNum: 1 }); // 重置到第一页
  };
  /**reset */
  const reset = async () => {
    formRef.current.resetFields();
    search();
  };
  /**touch search fields */
  const immediatelySearchFields: any = [];
  fields.map((field: any) => {
    if (field.immediatelysearch === 1) {
      immediatelySearchFields.push(field.name);
    }
  });
  const tools: any = [];
  // 是否显示查询
  if (expand) {
    tools.push(
      {
        label: '查询',
        onClick: search,
        icon: 'icon-searchicon',
      },
      {
        label: '重置',
        onClick: reset,
        icon: 'icon-reset',
      },
    );
  }
  // 是否有更多查询
  if (
    fields.some((field: any) => {
      return field.ismore;
    }) &&
    expand
  ) {
    tools.push({
      label: more ? '收起' : '更多',
      onClick: () => {
        setmore(!more);
        onExpand && onExpand();
      },
    });
  }
  const searchFields = more
    ? fields
    : fields.filter((field: any) => {
        return !field.ismore;
      });
  return (
    <div className="app-search" id={id}>
      <div className="search-form-tools">
        {tools.map((tool: any) => {
          return (
            <span
              style={tool.style}
              className="search-form-tools-btn"
              key={tool.label}
              onClick={tool.onClick}
            >
              {tool.label === '查询' && loading && (
                <Button
                  loading={loading}
                  icon={
                    <IconFont
                      style={{
                        fontSize: 14,
                        marginRight: 8,
                      }}
                      type="icon-loading"
                    />
                  }
                />
              )}
              {tool.icon && (
                <IconFont
                  type={tool.icon}
                  style={{ fontSize: 14, marginRight: 8, ...tool.iconStyle }}
                />
              )}
              {tool.label}
            </span>
          );
        })}
      </div>
      <div className={expand ? 'app-search-form' : 'app-search-form-none'}>
        <Form
          name="SearchForm"
          layout={layout}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          formRef={formRef}
          fields={searchFields}
          onFieldsChange={(changedFields: any) => {
            if (changedFields[0]) {
              if (immediatelySearchFields.includes(changedFields[0].name[0])) {
                search();
              }
            }
          }}
          {...restProps}
        />
      </div>
    </div>
  );
};
