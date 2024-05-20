export function getDateDifference(date1: string, date2: string) {
  const startDate = new Date(date1).getTime();
  const endDate = new Date(date2).getTime();
  const difference = endDate - startDate;

  return Math.round(difference / (1000 * 3600 * 24)) + 1;
}
