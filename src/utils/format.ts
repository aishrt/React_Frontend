import { default as dayjs } from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export const fMinDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');
export const formatDateTime = (date: string | number) => dayjs(date).format('MMMM D, YYYY h:mm A');
export const formatDate = (date: string | number) => dayjs(date).format('MMMM D, YYYY');
export const timeFromNow = (date: string) => (dayjs() as any).from(dayjs(date), true);

export const formatString = (str: string) => str.replace('_', ' ');
export const formatMoney = (str: string | number) => `$ ${str}`;
export const formatPercent = (str: string | number) => `${str} %`;

export const trimText = (string: string) => {
  const result: string = string?.slice(0, 10) + '..';
  return result;
};

