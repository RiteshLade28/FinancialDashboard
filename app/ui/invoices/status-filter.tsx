'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

const statuses = [
  { label: 'All', value: '' },
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
];

export default function StatusFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentStatus = searchParams.get('status') || '';

  const handleFilter = (status: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
      {statuses.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => handleFilter(value)}
          className={clsx(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            currentStatus === value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
