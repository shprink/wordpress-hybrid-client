import { Config } from '../../src/providers/config';
import { Toast } from '../../src/providers/toast';
import { Menu } from '../../src/providers/menu';
import { Storage } from '../../src/providers/storage';
import { ServiceWorkerProvider } from '../../src/providers/service-worker/service-worker';
import { PushNotifications, PushNotificationsForWordPress } from '../../src/providers/pushNotifications';
import { NativeProvider } from '../../src/providers/native/native';

export * from '../../src/providers/config';
export * from '../../src/providers/toast';
export * from '../../src/providers/menu';
export * from '../../src/providers/storage';
export * from '../../src/providers/service-worker/service-worker';
export * from '../../src/providers/native/native';
export * from '../../src/providers/pushNotifications';

export const PROVIDERS = [
  Config,
  Toast,
  Menu,
  Storage,
  PushNotifications,
  PushNotificationsForWordPress,
  ServiceWorkerProvider,
  NativeProvider,
];