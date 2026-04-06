import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchTrashedInvoices } from '@/app/lib/data';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';
import RestoreButton from '@/app/ui/invoices/restore-button';
import PermanentDeleteButton from '@/app/ui/invoices/permanent-delete-button';

export default async function Page() {
  const trashedInvoices = await fetchTrashedInvoices();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-2xl`}>Trash</h1>
      <p className="mb-6 text-sm text-gray-500">
        Deleted invoices are kept here. Restore them or permanently delete.
      </p>

      {trashedInvoices.length === 0 ? (
        <div className="rounded-xl bg-gray-50 p-8 text-center">
          <p className="text-gray-400">Trash is empty.</p>
        </div>
      ) : (
        <div className="rounded-lg bg-gray-50 p-2">
          {/* Mobile */}
          <div className="md:hidden">
            {trashedInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 rounded-md bg-white p-4 opacity-75"
              >
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={invoice.image_url}
                      alt={invoice.name}
                      className="rounded-full"
                      width={28}
                      height={28}
                    />
                    <div>
                      <p className="font-medium">{invoice.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatCurrency(invoice.amount)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <p className="text-xs text-gray-400">
                    Deleted {formatDateToLocal(new Date(invoice.deletedAt).toISOString())}
                  </p>
                  <div className="flex gap-2">
                    <RestoreButton id={invoice.id} />
                    <PermanentDeleteButton id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-4 font-medium sm:pl-6">Customer</th>
                <th className="px-3 py-4 font-medium">Amount</th>
                <th className="px-3 py-4 font-medium">Invoice Date</th>
                <th className="px-3 py-4 font-medium">Status</th>
                <th className="px-3 py-4 font-medium">Deleted</th>
                <th className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {trashedInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b text-sm opacity-75 last-of-type:border-none"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.image_url}
                        alt={invoice.name}
                        className="rounded-full"
                        width={28}
                        height={28}
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-500">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-400 text-xs">
                    {formatDateToLocal(
                      new Date(invoice.deletedAt).toISOString(),
                    )}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      <RestoreButton id={invoice.id} />
                      <PermanentDeleteButton id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
