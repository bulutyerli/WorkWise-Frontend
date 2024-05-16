import { ButtonType } from '../types/types';
import LoadingSpinner from './LoadingSpinner';

export default function CustomButton({
  onClick,
  icon,
  color,
  text,
  isLoading,
}: ButtonType) {
  const colorClasses: Record<string, string> = {
    primary: 'bg-orange-600 hover:bg-orange-500',
    secondary: 'bg-purple-700 hover:bg-purple-500',
    neutral: 'bg-neutral-700 hover:bg-neutral-500',
    danger: 'bg-red-700 hover:bg-red-600',
  };

  const defaultColor = 'bg-neutral-700 hover:bg-neutral-500';
  const selectedColor = colorClasses[color] || defaultColor;

  return (
    <button
      type="button"
      className={`inline-flex min-w-16 justify-center items-center gap-x-1.5 rounded-md ${selectedColor} px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50`}
      onClick={onClick}
    >
      {isLoading ? <LoadingSpinner /> : text}
      {icon && icon}
    </button>
  );
}
