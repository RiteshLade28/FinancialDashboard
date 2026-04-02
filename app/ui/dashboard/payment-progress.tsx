import { lusitana } from '@/app/ui/fonts';
import { formatCurrency } from '@/app/lib/utils';
import { fetchPaymentProgress } from '@/app/lib/data';

export default async function PaymentProgress() {
  const { paid, pending, paidCount, pendingCount, paidPercent } =
    await fetchPaymentProgress();

  return (
    <div className="w-full">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Payment Progress
      </h2>
      <div className="rounded-xl bg-gray-50 p-6">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-green-700">
              {paidPercent}% Collected
            </span>
            <span className="font-medium text-orange-600">
              {100 - paidPercent}% Pending
            </span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-orange-200">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{ width: `${paidPercent}%` }}
            />
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="rounded-lg bg-white p-4">
            <p className="text-sm text-gray-500">Collected</p>
            <p className={`${lusitana.className} text-xl text-green-700`}>
              {formatCurrency(paid)}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {paidCount} {paidCount === 1 ? 'invoice' : 'invoices'}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className={`${lusitana.className} text-xl text-orange-600`}>
              {formatCurrency(pending)}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {pendingCount} {pendingCount === 1 ? 'invoice' : 'invoices'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
