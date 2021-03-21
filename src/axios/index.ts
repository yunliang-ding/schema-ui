import axios from 'axios';
import { notification } from 'antd';
export default async (url: string, config: any = {}): Promise<any> => {
  const _config = {
    ...config,
    url,
    timeout: 30000,
    headers: {
      ...config.headers,
    },
    /**控制允许接受的状态码范围 */
    validateStatus: (status: number) => {
      return status >= 200 && status < 505;
    },
  };
  try {
    const response: any = await axios(_config);
    if (response.data.code !== 200) {
      notification.error({
        message: '提示',
        description: response.data.message || '接口异常',
      });
      throw 'error';
    }
    if (config.notification) {
      notification.success({
        message: '提示',
        description: '操作成功',
      });
    }
    return response.data.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
