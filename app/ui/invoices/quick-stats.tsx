import { formatCurrency } from '@/app/lib/utils';
import { fetchFilteredStats } from '@/app/lib/data';

export default async function QuickStats({
  query,
  status,
}: {
  query: string;
  status?: string;
}) {
  const { count, total } = await fetchFilteredStats(query, status);

  return (
    <div className="rounded-lg bg-blue-50 p-3 text-sm border border-blue-200">
      <p className="text-blue-900">
        <span className="font-semibold">{count}</span> invoice
        {count !== 1 ? 's' : ''} • Total:{' '}
        <span className="font-semibold">{formatCurrency(total)}</span>
      </p>
    </div>
  );
}
