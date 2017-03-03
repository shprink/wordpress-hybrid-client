import { Config } from './config';
import { Toast } from './toast';
import { Menu } from './menu';

export * from './config';
export * from './toast';
export * from './menu';

export const PROVIDERS = [
  Config,
  Toast,
  Menu
];