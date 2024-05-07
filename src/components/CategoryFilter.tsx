import { CategoriesData } from '../types/types';

export default function CategoryFilter({
  categories,
  onFilterSelect,
  selectedCategory,
}: {
  categories: CategoriesData[];
  onFilterSelect: (e: string) => void;
  selectedCategory: CategoriesData;
}) {
  return (
    <div className="text-end flex items-center justify-end gap-2">
      <label htmlFor="filter" className="font-semibold text-slate-600">
        Category:
      </label>
      <select
        value={selectedCategory.id}
        onChange={(e) => onFilterSelect(e.target.value)}
      >
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          );
        })}
      </select>
    </div>
  );
}
