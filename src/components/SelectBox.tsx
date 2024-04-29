import { AllCategoriesType } from '../types/types';

export default function SelectBox({
  categories,
  onFilterChange,
  filters,
}: {
  categories: AllCategoriesType;
  onFilterChange: (selectedFilters: Record<string, string | null>) => void;
  filters: Record<string, string | null>;
}) {
  const allCategories = categories.data;

  const handleCategoryChange = (category: string, value: string) => {
    onFilterChange({
      [category]: value, // Update the specific category
    });
  };

  return (
    <div>
      <label
        htmlFor="location"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Filter By:
      </label>
      <div className="flex gap-2 max-w-full overflow-auto filter-scroll">
        {Object.entries(allCategories).map(([cat, subCat]) => {
          const catName = cat[0].toUpperCase() + cat.slice(1);
          return (
            <div key={catName}>
              <label className="text-sm">{catName}</label>
              <select
                className="mt-2 block w-60 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => handleCategoryChange(cat, e.target.value)}
                value={filters[cat] || 'All'}
              >
                <option value="All">All</option>
                {subCat.map((sub) => {
                  return (
                    <option key={sub.name} value={sub.name}>
                      {sub.name}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}
