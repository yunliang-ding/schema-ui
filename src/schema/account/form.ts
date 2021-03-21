import { saveOrUpdate } from "@/service/acount";
export default {
  formName: 'form-account',
  formTitle: '账号',
  formWidth: 500,
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
  request: (data:any) => {
    return saveOrUpdate(data)
  },
  fields: [
    {
      sort: 1,
      type: 'Input',
      name: 'name',
      label: '用户名称',
      rules: [
        {
          required: true,
          message: '请输入用户名称',
        },
      ],
      props: {
        placeholder: '用户名称',
        style: {
          width: 360,
        },
      },
    },
    {
      sort: 2,
      type: 'Input',
      name: 'nickname',
      label: '用户昵称',
      rules: [
        {
          required: true,
          message: '用户昵称不能为空',
        },
      ],
      props: {
        placeholder: '请输入用户昵称',
        style: {
          width: 360,
        },
      },
    },
    {
      sort: 3,
      type: 'RadioGroup',
      name: 'sex',
      label: '性别',
      rules: [
        {
          required: true,
          message: '性别不能为空',
        },
      ],
      props: {
        options: [
          { label: "男", value: 1 },
          { label: "女", value: 2 },
        ],
        style: {
          width: 360,
        },
      },
    },
    {
      sort: 4,
      type: 'Input',
      name: 'phone',
      label: '联系方式',
      rules: [
        {
          required: true,
          message: '联系方式不能为空',
        },
        {
          pattern: /^1[1-9][0-9]{9}$/,
          message: '联系方式格式错误',
        },
      ],
      props: {
        placeholder: '请输入联系方式',
        style: {
          width: 360,
        },
      },
    },
    {
      sort: 5,
      type: 'Input',
      name: 'email',
      label: '电子邮箱',
      rules: [
        {
          required: true,
          message: '电子邮箱不能为空',
        },
        {
          pattern: /^1[1-9][0-9]{9}$/,
          message: '电子邮箱格式错误',
        },
      ],
      props: {
        placeholder: '请输入电子邮箱',
        style: {
          width: 360,
        },
      },
    },
    {
      sort: 7,
      type: 'InputNumber',
      name: 'age',
      label: '年龄',
      rules: [{ required: true, message: '年龄不能为空' }],
      props: {
        placeholder: '请输入年龄',
        style: {
          width: 360,
        },
      },
    },
    {
      sort: 8,
      type: 'CheckGroup',
      name: 'liked',
      label: '爱好',
      rules: [{ required: true, message: '爱好不能为空' }],
      props: {
        options: [
          { label: "听歌", value: 1 },
          { label: "电影", value: 2 },
          { label: "学习", value: 3 },
          { label: "游戏", value: 4 },
        ],
        style: {
          width: 360,
        },
      },
    },
    {
      sort: 9,
      type: 'Select',
      name: 'className',
      label: '级别',
      rules: [{ required: true, message: '级别不能为空' }],
      props: {
        placeholder: '请选择年龄',
        options: [
          { label: "一年级", value: 1 },
          { label: "二年级", value: 2 },
          { label: "三年级", value: 3 },
          { label: "四年级", value: 4 },
        ],
        style: {
          width: 360,
        },
      },
    },
    {
      sort: 11,
      type: 'TextArea',
      name: 'address',
      label: '家庭住址',
      rules: [
        {
          required: true,
          message: '家庭住址不能为空',
        },
      ],
      props: {
        placeholder: '请输入家庭住址',
        style: {
          width: 360,
        },
      },
    },
  ],
};
