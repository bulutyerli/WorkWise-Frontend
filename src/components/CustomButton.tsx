import { ButtonType } from '../types/types';

export default function CustomButton({
  onClick,
  icon,
  color,
  text,
}: ButtonType) {
  const selectedColor =
    color === 'primary'
      ? 'bg-orange-600 hover:bg-orange-500'
      : color === 'secondary'
        ? 'bg-purple-700 hover:bg-purple-500'
        : color === 'neutral'
          ? 'bg-neutral-700 hover:bg-neutral-500'
          : 'bg-neutral-700 hover:bg-neutral-500';
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-x-1.5 rounded-md ${selectedColor} px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50`}
      onClick={onClick}
    >
      {text}
      {icon && icon}
    </button>
  );
}
