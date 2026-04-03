'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const sortOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Total Invoices', value: 'invoices' },
  { label: 'Total Pending', value: 'pending' },
  { label: 'Total Paid', value: 'paid' },
];

export default function SortDropdown() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentSort = searchParams.get('sort') || 'name';
  const currentOrder = searchParams.get('order') || 'asc';

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    // Toggle order if same sort is selected again
    if (value === currentSort) {
      params.set('order', currentOrder === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('order', 'asc');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-500">Sort by:</label>
      <select
        value={currentSort}
        onChange={(e) => handleSort(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
      >
        {sortOptions.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button
        onClick={() => handleSort(currentSort)}
        className="rounded-md border border-gray-300 px-2 py-1.5 text-sm hover:bg-gray-100"
        title={`Currently ${currentOrder === 'asc' ? 'ascending' : 'descending'}`}
      >
        {currentOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}
