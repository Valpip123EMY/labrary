import { FilterCategory, FilterType } from '@/types';

interface FiltersProps {
  selectedCategory: FilterCategory;
  selectedType: FilterType;
  onCategoryChange: (category: FilterCategory) => void;
  onTypeChange: (type: FilterType) => void;
}

const categories: FilterCategory[] = ['all', 'Computer Science', 'Biology', 'Physics', 'Chemistry', 'Engineering', 'Medicine'];

export function Filters({ selectedCategory, onCategoryChange }: FiltersProps) {
  return (
    <div className="w-full border-b border-black/5">
      <div className="container px-6 md:px-8">
        <div className="flex gap-8 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                py-4 text-sm font-medium whitespace-nowrap transition-colors relative
                ${selectedCategory === category
                  ? 'text-black'
                  : 'text-black/40 hover:text-black/60'
                }
              `}
            >
              {category === 'all' ? 'All' : category}
              {selectedCategory === category && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
