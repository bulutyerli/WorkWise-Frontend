export default function CategoryFilter<T>({
  categories,
  onFilterSelect,
  selectedCategory,
  keyCreator,
  option,
  title,
  addAll,
}: {
  categories: T[];
  onFilterSelect: (e: string) => void;
  selectedCategory: T;
  keyCreator: (item: T) => number | string;
  option: (item: T) => string | number;
  title: string;
  addAll?: boolean;
}) {
  return (
    <div className="text-end flex items-center justify-end gap-2">
      <label htmlFor="filter" className="font-semibold text-slate-600">
        {title}
      </label>
      <select
        id="filter"
        value={keyCreator(selectedCategory)}
        onChange={(e) => onFilterSelect(e.target.value)}
      >
        {addAll && (
          <option key="all" value="0">
            All
          </option>
        )}
        {categories.map((category) => {
          const key = keyCreator(category);
          const newOption = option(category);
          return (
            <option key={key} value={key}>
              {newOption}
            </option>
          );
        })}
      </select>
    </div>
  );
}
