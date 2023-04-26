import { notification } from 'antd';

const openNotification = (type = 'success', message = 'success', description = 'success') => {
  return notification[type]({ message, description, placement: 'bottomRight' })
}

export default openNotification;