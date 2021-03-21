import { getList, deleteById } from "@/service/acount";
import { tableScrollHeight } from "@/util";
export default {
  request: (params: any) => {
    return getList(params);
  },
  tableScrollHeight,
  tools: [
    {
      label: "添加",
      value: "add",
      icon: "icon-plus",
    },
    {
      type: "FilterColumns",
    },
    {
      type: "Refresh",
    },
  ],
  columns: [
    // 列基本信息
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "用户账号",
      dataIndex: "name",
      ellipsis: true,
      width: 120,
    },
    {
      title: "用户昵称",
      dataIndex: "nickname",
      width: 120,
      ellipsis: true,
    },
    {
      title: "性别",
      dataIndex: "sex",
      width: 120,
    },
    {
      title: "年龄",
      dataIndex: "age",
      width: 120,
    },
    {
      title: "联系方式",
      dataIndex: "phone",
      width: 120,
    },
    {
      title: "电子邮箱",
      dataIndex: "email",
      width: 120,
    },
    {
      title: "年龄",
      dataIndex: "age",
      width: 120,
    },
    {
      title: "爱好",
      dataIndex: "liked",
      width: 120,
      ellipsis: true,
    },
    {
      title: "级别",
      dataIndex: "className",
      width: 120,
    },
    {
      title: "地址",
      dataIndex: "address",
      width: 200,
      ellipsis: true,
    },
  ],
  rowOperations(record: any) {
    return [
      {
        label: "编辑",
        value: "edit",
        icon: "icon-edit",
      },
      {
        label: "删除",
        value: "delete",
        icon: "icon-shanchu",
        type: 'confirm',
        onClick: (record:any) => {
          return deleteById(record)
        }
      },
    ];
  },
};
