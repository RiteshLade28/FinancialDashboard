'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function SortableHeader({
  column,
  label,
  className,
}: {
  column: string;
  label: string;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || 'asc';
  const isActive = currentSort === column;

  const handleSort = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (isActive && currentOrder === 'asc') {
      params.set('order', 'desc');
    } else {
      params.set('order', 'asc');
    }
    params.set('sort', column);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <th scope="col" className={className}>
      <button
        onClick={handleSort}
        className="flex items-center gap-1 font-medium hover:text-blue-600"
      >
        {label}
        {isActive && (
          currentOrder === 'asc'
            ? <ChevronUpIcon className="h-4 w-4" />
            : <ChevronDownIcon className="h-4 w-4" />
        )}
      </button>
    </th>
  );
}
