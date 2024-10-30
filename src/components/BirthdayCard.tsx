import { BirthdayDataType } from '../types/types';

export default function BirthdayCard({ data }: { data: BirthdayDataType }) {
  const birthday = new Date(data.birthday);
  const day = birthday.getDate();
  const month = birthday.toLocaleString('default', { month: 'short' });
  const name = `${data.name} ${data.surname}`;
  return (
    <div className="w-[250px] grid grid-cols-6 grid-rows-5">
      <div className="flex flex-col items-centers justify-center max-w-full p-1 md:p-2  text-white bg-purple-600 rounded-md shadow-xl col-span-2 col-start-1 row-span-4 row-start-1 z-10 text-center">
        <span data-testid="birthday-day" className="text-lg md:text-4xl">
          {day}
        </span>
        <span data-testid="birthday-month" className="text-xs md:text-sm">
          {month}
        </span>
      </div>
      <div
        data-testid="birthday-fullname"
        className="col-span-5 col-start-2 bg-slate-100 p-2 rounded-md pl-10 max-w-full row-span-full row-start-2 text-right shadow-inner shadow-slate-300"
      >
        <div className="text-slate-700 font-semibold text-xs md:text-base">
          {name}
        </div>
        <div className="text-xs md:text-sm">{data.role}</div>
        <div className="text-xs md:text-sm text-slate-700">{data.office}</div>
      </div>
    </div>
  );
}
