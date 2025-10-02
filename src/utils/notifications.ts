import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { notifications, type NotificationData } from '@mantine/notifications';

type CommonNotificationProps = Pick<NotificationData, 'position' | 'withCloseButton' | 'autoClose'>; 

const commonNotificationProps: CommonNotificationProps = {
  position: 'top-right',
  withCloseButton: true,
  autoClose: 3000,
};

  export const successNotification = (message: string) => 
    notifications.show({
      ...commonNotificationProps,
      title: 'Success',
      message,
      color: 'green',
    })

  export const errorNotification = (message: string) => 
    notifications.show({
      ...commonNotificationProps,
      title: 'Error',
      message,
      color: 'red',
    })  
  

  export const infoNotification = (message: string) => 
    notifications.show({
      ...commonNotificationProps,
      title: 'Info',
      message,
      color: 'blue',
    })  
  

  export const warningNotification = (message: string) => 
    notifications.show({
      ...commonNotificationProps,
      title: 'Warning',
      message,
      color: 'yellow',
    })  
  


