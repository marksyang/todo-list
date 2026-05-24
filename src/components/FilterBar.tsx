interface FilterBarProps {
  currentFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

const filters: { key: 'all' | 'active' | 'completed'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '待完成' },
  { key: 'completed', label: '已完成' },
];

export function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 mb-4 text-sm">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-3 py-1 rounded-full transition-colors ${
            currentFilter === key
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
