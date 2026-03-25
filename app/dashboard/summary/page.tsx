import { lusitana } from '@/app/ui/fonts';
import { fetchInvoiceSummary, fetchCardData } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';
import Image from 'next/image';

export default async function Page() {
  const [summary, cardData] = await Promise.all([
    fetchInvoiceSummary(),
    fetchCardData(),
  ]);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Summary
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-gray-50 p-4">
          <h2 className="text-sm font-medium text-gray-500">Total Collected</h2>
          <p className={`${lusitana.className} mt-2 text-2xl`}>
            {cardData.totalPaidInvoices}
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <h2 className="text-sm font-medium text-gray-500">Total Pending</h2>
          <p className={`${lusitana.className} mt-2 text-2xl`}>
            {cardData.totalPendingInvoices}
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <h2 className="text-sm font-medium text-gray-500">
            Total Invoices
          </h2>
          <p className={`${lusitana.className} mt-2 text-2xl`}>
            {cardData.numberOfInvoices}
          </p>
        </div>
      </div>

      <h2
        className={`${lusitana.className} mb-4 mt-8 text-xl md:text-2xl`}
      >
        By Customer
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="md:hidden">
          {summary.map((customer) => (
            <div
              key={customer.id}
              className="mb-4 rounded-md bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={customer.image_url}
                  alt={customer.name}
                  className="rounded-full"
                  width={32}
                  height={32}
                />
                <p className="text-sm font-medium">{customer.name}</p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Paid</p>
                  <p className="font-medium text-green-600">
                    {formatCurrency(customer.totalPaid)} ({customer.paidCount})
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Pending</p>
                  <p className="font-medium text-orange-500">
                    {formatCurrency(customer.totalPending)} ({customer.pendingCount})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <table className="hidden min-w-full md:table">
          <thead className="text-left text-sm text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Paid</th>
              <th className="px-4 py-3 font-medium">Pending</th>
              <th className="px-4 py-3 font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {summary.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-gray-200 text-sm"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={customer.image_url}
                      alt={customer.name}
                      className="rounded-full"
                      width={28}
                      height={28}
                    />
                    {customer.name}
                  </div>
                </td>
                <td className="px-4 py-3 text-green-600">
                  {formatCurrency(customer.totalPaid)} ({customer.paidCount})
                </td>
                <td className="px-4 py-3 text-orange-500">
                  {formatCurrency(customer.totalPending)} ({customer.pendingCount})
                </td>
                <td className="px-4 py-3 font-medium">
                  {formatCurrency(customer.totalPaid + customer.totalPending)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
