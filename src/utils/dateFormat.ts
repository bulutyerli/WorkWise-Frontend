export default function dateFormat(birthday: Date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const newBday = new Date(birthday);
  const day = newBday.getDate();
  const monthIndex = newBday.getMonth();
  const year = newBday.getFullYear();
  const formattedDate = `${day.toString().padStart(2, '0')} ${monthNames[monthIndex]} ${year}`;

  return formattedDate;
}
