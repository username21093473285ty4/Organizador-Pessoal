import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const generateCalendarDays = (date: Date): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days: Date[] = [];
  let currentDay = calendarStart;

  while (currentDay <= calendarEnd) {
    days.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  return days;
};

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDisplayDate = (date: Date): string => {
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
};

export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy', { locale: ptBR });
};

export const formatDayOfWeek = (date: Date): string => {
  return format(date, 'EEE', { locale: ptBR });
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const isSameMonthCheck = (date1: Date, date2: Date): boolean => {
  return isSameMonth(date1, date2);
};

export const nextMonth = (date: Date): Date => {
  return addMonths(date, 1);
};

export const previousMonth = (date: Date): Date => {
  return subMonths(date, 1);
};
