import { format, parseISO } from "date-fns"
import { ru } from 'date-fns/locale';

export const useParsDate = (date: any) => {
  const parsDate = format(parseISO(date), "d MMMM yyyy", {locale: ru})
  
  return parsDate;
}