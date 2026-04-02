import { lusitana } from '@/app/ui/fonts';
import { store } from '@/app/lib/in-memory-data';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';

export default function Page() {
  const invoices = store.invoices;
  const customers = store.customers;

  const paidInvoices = invoices.filter((i) => i.status === 'paid');
  const pendingInvoices = invoices.filter((i) => i.status === 'pending');

  const avgAmount =
    invoices.length > 0
      ? invoices.reduce((sum, i) => sum + i.amount, 0) / invoices.length
      : 0;

  const oldestPending = pendingInvoices.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )[0];

  const topCustomers = customers
    .map((customer) => {
      const customerInvoices = invoices.filter(
        (i) => i.customer_id === customer.id,
      );
      const total = customerInvoices.reduce((sum, i) => sum + i.amount, 0);
      return { ...customer, total };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-8 text-2xl`}>Reports</h1>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-xl bg-gray-50 p-4">
          <h2 className="text-sm font-medium text-gray-500">
            Avg Invoice Amount
          </h2>
          <p className={`${lusitana.className} mt-2 text-2xl`}>
            {formatCurrency(avgAmount)}
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <h2 className="text-sm font-medium text-gray-500">
            Pending Count
          </h2>
          <p className={`${lusitana.className} mt-2 text-2xl`}>
            {pendingInvoices.length}
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <h2 className="text-sm font-medium text-gray-500">Paid Count</h2>
          <p className={`${lusitana.className} mt-2 text-2xl`}>
            {paidInvoices.length}
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <h2 className="text-sm font-medium text-gray-500">
            Total Customers
          </h2>
          <p className={`${lusitana.className} mt-2 text-2xl`}>
            {customers.length}
          </p>
        </div>
      </div>

      {/* Oldest Pending Invoice */}
      {oldestPending && (
        <div className="mb-8 rounded-xl bg-blue-50 p-6 border border-blue-200">
          <h2 className="mb-4 text-lg font-medium text-blue-900">
            Oldest Pending Invoice
          </h2>
          <div className="space-y-2 text-blue-800">
            {(() => {
              const customer = customers.find(
                (c) => c.id === oldestPending.customer_id,
              );
              return (
                <>
                  <p>
                    <span className="font-medium">Customer:</span> {customer?.name}
                  </p>
                  <p>
                    <span className="font-medium">Amount:</span>{' '}
                    {formatCurrency(oldestPending.amount)}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{' '}
                    {formatDateToLocal(oldestPending.date)}
                  </p>
                  <p>
                    <span className="font-medium">Days Pending:</span>{' '}
                    {Math.floor(
                      (Date.now() - new Date(oldestPending.date).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}
                  </p>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Top Customers */}
      <div className="rounded-xl bg-gray-50 p-6">
        <h2 className="mb-4 text-lg font-medium">Top 5 Customers by Amount</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium text-right">Total</th>
                <th className="px-4 py-3 font-medium text-right">Invoice Count</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-4 py-3">{customer.name}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatCurrency(customer.total)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {
                      invoices.filter((i) => i.customer_id === customer.id)
                        .length
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
