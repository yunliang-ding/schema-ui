import React, { useState } from 'react';
function useCreatePage() {
  const [layer, setlayer]: any = useState(null);
  return {
    open(layer: any) {
      // 打开
      setlayer(layer);
    },
    close() {
      // 关闭
      setlayer(null);
    },
    mount(page: any, layers: any = {}) {
      // 返回
      return (
        <>
          {page}
          {layers[layer]}
        </>
      );
    },
  };
}
export default useCreatePage;
