import Image from 'next/image';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { store } from '@/app/lib/in-memory-data';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';

export default function Page() {
  const pendingInvoices = store.invoices
    .filter((i) => i.status === 'pending')
    .map((invoice) => {
      const customer = store.customers.find(
        (c) => c.id === invoice.customer_id,
      );
      const daysPending = Math.floor(
        (Date.now() - new Date(invoice.date).getTime()) / (1000 * 60 * 60 * 24),
      );
      return { ...invoice, customer, daysPending };
    })
    .sort((a, b) => b.daysPending - a.daysPending);

  const totalOutstanding = pendingInvoices.reduce(
    (sum, i) => sum + i.amount,
    0,
  );

  return (
    <main>
      <h1 className={`${lusitana.className} mb-8 text-2xl`}>
        Outstanding Invoices
      </h1>

      {/* Summary Card */}
      <div className="mb-8 rounded-xl bg-orange-50 p-6 border border-orange-200">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-orange-600">Total Outstanding</p>
            <p className={`${lusitana.className} mt-2 text-2xl text-orange-900`}>
              {formatCurrency(totalOutstanding)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-orange-600">Invoice Count</p>
            <p className={`${lusitana.className} mt-2 text-2xl text-orange-900`}>
              {pendingInvoices.length}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-orange-600">Avg Days Pending</p>
            <p className={`${lusitana.className} mt-2 text-2xl text-orange-900`}>
              {pendingInvoices.length > 0
                ? Math.round(
                    pendingInvoices.reduce((sum, i) => sum + i.daysPending, 0) /
                      pendingInvoices.length,
                  )
                : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      {pendingInvoices.length > 0 ? (
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="md:hidden">
            {pendingInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-3 rounded-md bg-white p-4 border border-red-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={invoice.customer?.image_url || ''}
                      alt={invoice.customer?.name || ''}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                    <div>
                      <p className="font-medium">{invoice.customer?.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatDateToLocal(invoice.date)}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                    {invoice.daysPending} days
                  </span>
                </div>
                <p className="text-lg font-medium">
                  {formatCurrency(invoice.amount)}
                </p>
              </div>
            ))}
          </div>

          <table className="hidden min-w-full text-sm md:table">
            <thead className="border-b text-left">
              <tr>
                <th className="px-4 py-4 font-medium">Customer</th>
                <th className="px-4 py-4 font-medium">Amount</th>
                <th className="px-4 py-4 font-medium">Date</th>
                <th className="px-4 py-4 font-medium">Days Pending</th>
              </tr>
            </thead>
            <tbody>
              {pendingInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-4 py-4">
                    <Link
                      href={`/dashboard/customers?query=${encodeURIComponent(invoice.customer?.name || '')}`}
                      className="flex items-center gap-3 hover:text-blue-600"
                    >
                      <Image
                        src={invoice.customer?.image_url || ''}
                        alt={invoice.customer?.name || ''}
                        className="rounded-full"
                        width={28}
                        height={28}
                      />
                      <span className="hover:underline">{invoice.customer?.name}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-4 font-medium">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        invoice.daysPending > 30
                          ? 'bg-red-100 text-red-700'
                          : invoice.daysPending > 14
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {invoice.daysPending} days
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl bg-green-50 p-8 text-center border border-green-200">
          <p className="text-lg font-medium text-green-900">
            No outstanding invoices
          </p>
          <p className="mt-2 text-sm text-green-700">
            All invoices have been paid!
          </p>
        </div>
      )}
    </main>
  );
}
