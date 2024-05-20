import { AnnualLeaveType } from '../types/types';

export function totalAnnualLeave(data: AnnualLeaveType[]) {
  let total = 0;
  data.map((item: AnnualLeaveType) => {
    const startDate = new Date(item.starting_date).getTime();
    const endDate = new Date(item.end_date).getTime();
    const difference = endDate - startDate;
    total += difference;
  });
  return 20 - Math.round(total / (1000 * 3600 * 24));
}
