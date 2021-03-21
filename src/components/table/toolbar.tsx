import React, { useState } from "react";
import FilterColumns from "./filter-columns";
import IconFont from "@/util/icon";
export default (props: any) => {
  const {
    filterIds = [], // 过滤的字段
    columns = [], // 全部的列
    tools = [], // 顶部工具栏
    toolsClick = () => {}, // 顶部工具栏点击回调
    onFilter = () => {}, // filter回调
    onRefresh = () => {}, // refresh
  } = props;
  const [_filterIds, setfilterIds] = useState(filterIds);
  return tools.length > 0 ? (
    <div className="table-form-tools">
      {tools.map((tool: any, index: number) => {
        return (
          <span
            className={
              tool.disabled
                ? "table-form-tools-btn table-form-tools-btn-disabled"
                : "table-form-tools-btn"
            }
            key={"tool-" + index}
            onClick={() => {
              if (tool.disabled) {
                return;
              }
              toolsClick(tool);
            }}
          >
            {tool.icon && (
              <IconFont
                type={tool.icon}
                style={{ fontSize: 14, marginRight: 8 }}
              />
            )}
            {tool.label}
            {tool.type === "FilterColumns" && (
              <FilterColumns
                filterIds={_filterIds}
                columns={columns}
                onOk={(filterIds: any) => {
                  setfilterIds(filterIds);
                  onFilter(filterIds);
                }}
              />
            )}
            {tool.type === "Refresh" && (
              <IconFont type="icon-refresh" onClick={onRefresh} />
            )}
          </span>
        );
      })}
    </div>
  ) : null;
};
