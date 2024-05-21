import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { getDateDifference } from '../utils/getDateDifference';
import CustomButton from './CustomButton';

export default function DatePicker({
  handleSubmit,
}: {
  handleSubmit: (dates: [Date, Date]) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    if (selectedDate[0] === null || (selectedDate[0] && selectedDate[1])) {
      setSelectedDate([date, null]);
    } else {
      setSelectedDate([selectedDate[0], date]);
    }
  };

  useEffect(() => {
    if (selectedDate[0] && selectedDate[1]) {
      const difference = getDateDifference(
        selectedDate[0].toLocaleDateString(),
        selectedDate[1].toLocaleDateString()
      );

      if (difference < 1) {
        setSelectedDate([null, null]);
      }
    }
  }, [selectedDate]);

  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="relative w-full md:max-w-[45%]">
        <button
          type="button"
          className="absolute -left-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={handlePrevMonth}
        >
          <span className="sr-only">Previous month</span>
          <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="absolute right-0 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={handleNextMonth}
        >
          <span className="sr-only">Next month</span>
          <FaChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
        <section className="text-center">
          <h2 className="text-sm font-semibold text-gray-900">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {days.map((day, dayIdx) => (
              <button
                key={dayIdx}
                type="button"
                className={clsx(
                  isSameMonth(day, currentMonth)
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-50 text-gray-400',
                  selectedDate[0] &&
                    (isSameDay(day, selectedDate[0]) ||
                      (selectedDate[1] && isSameDay(day, selectedDate[1]))) &&
                    'text-red-700 font-semibold bg-purple-700',
                  'relative py-1.5 hover:bg-red-100 focus:z-10'
                )}
                onClick={() => handleDateClick(day)}
              >
                <time
                  dateTime={day.toISOString()}
                  className="mx-auto flex h-7 w-7 items-center justify-center rounded-full"
                >
                  {format(day, 'd')}
                </time>
              </button>
            ))}
          </div>
        </section>
      </div>
      {selectedDate[0] && (
        <section className="mt-12 space-y-3">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            Selected Dates
          </h2>
          <div className="space-y-1">
            <h3 className="text-slate-500">From:</h3>
            <p className=" text-base leading-6 text-slate-700">
              {format(selectedDate[0], 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          {selectedDate[1] && (
            <div className="space-y-1">
              <h3 className="text-slate-500">To:</h3>
              <p className="text-base leading-6 text-slate-700">
                {format(selectedDate[1], 'EEEE, MMMM d, yyyy')}
              </p>{' '}
            </div>
          )}
          {selectedDate[0] && selectedDate[1] && (
            <div className="space-y-1">
              <h3 className="text-slate-500">Total Days:</h3>
              <p className="text-base leading-6 text-slate-700">
                {getDateDifference(
                  selectedDate[0].toLocaleDateString(),
                  selectedDate[1].toLocaleDateString()
                )}
              </p>
              <CustomButton
                text="Send"
                onClick={() => handleSubmit(selectedDate as [Date, Date])}
                color="primary"
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
