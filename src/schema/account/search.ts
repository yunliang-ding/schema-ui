export default {
  fields: [
    {
      type: "Input",
      name: "name",
      label: "用户账号",
      sort: 1,
      props: {
        placeholder: "请输入",
        style: {
          background: "#fff",
          width: 140,
        },
      },
    },
    {
      type: "Input",
      name: "phone",
      label: "联系方式",
      sort: 2,
      props: {
        placeholder: "请输入",
        style: {
          background: "#fff",
          width: 140,
        },
      },
    },
    {
      type: "Select",
      name: "sex",
      label: "性别",
      sort: 3,
      props: {
        placeholder: "请选择",
        allowClear: true,
        options: [
          { label: "男", value: 1 },
          { label: "女", value: 2 },
        ],
        style: {
          background: "#fff",
          width: 140,
        },
      },
    },
    {
      type: "BetweenValue",
      name: "age",
      label: "年龄",
      sort: 4,
      ismore: 1,
      props: {
        style:{
          width: 200,
        },
        start: {
          placeholder: "最小",
          style: {
            width: 80,
          },
        },
        end: {
          placeholder: "最大",
          style: {
            width: 80,
          },
        },
      },
      transform:(values:any) => {
        return {
          startAge: values[0],
          endAge: values[1],
        }
      }
    },
  ],
};
