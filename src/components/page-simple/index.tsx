import React, { useState } from "react";
import useCreatePage from "@/hooks/use-create-page";
export default (props: any) => (Page: any, DrawerPage: any = {}) => (
  warpperProps: any
): any => {
  const [entity, setentity]: any = useState({});
  const [refresh, setRefresh]: any = useState(false);
  const { mount, open, close } = useCreatePage(); // 获取实例
  const schemas: any = {};
  /** 加载 schema */
  Object.keys(props.schemas).forEach((key: string) => {
    schemas[key] = require(`@/${props.schemas[key]}`).default;
  });
  /**解析DrawerPage */
  const drawerPage: any = {};
  Object.keys(DrawerPage).map((key: any) => {
    const Page = DrawerPage[key];
    drawerPage[key] = (
      <Page
        onRefresh={setRefresh.bind(null, !refresh)}
        entity={entity}
        schemas={schemas}
        close={close}
      />
    );
  });
  return mount(
    <Page
      entity={entity}
      refresh={refresh}
      setRefresh={setRefresh}
      setentity={setentity}
      schemas={schemas}
      close={close}
      open={open}
      {...warpperProps}
    />,
    drawerPage
  );
};
