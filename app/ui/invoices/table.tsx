import Image from 'next/image';
import Link from 'next/link';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import ToggleStatus from '@/app/ui/invoices/toggle-status';
import SortableHeader from '@/app/ui/invoices/sortable-header';
import InvoiceRow from '@/app/ui/invoices/invoice-row';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
  status,
  sort,
  order,
}: {
  query: string;
  currentPage: number;
  status?: string;
  sort?: string;
  order?: string;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage, status, sort, order);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <Link
                        href={`/dashboard/customers?query=${encodeURIComponent(invoice.name)}`}
                        className="hover:text-blue-600 hover:underline"
                      >
                        {invoice.name}
                      </Link>
                    </div>
                    <a href={`mailto:${invoice.email}`} className="text-sm text-gray-500 hover:text-blue-600 hover:underline">
                      {invoice.email}
                    </a>
                  </div>
                  <ToggleStatus id={invoice.id} status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <SortableHeader column="name" label="Customer" className="px-4 py-5 sm:pl-6" />
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <SortableHeader column="amount" label="Amount" className="px-3 py-5" />
                <SortableHeader column="date" label="Date" className="px-3 py-5" />
                <SortableHeader column="status" label="Status" className="px-3 py-5" />
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <InvoiceRow key={invoice.id} invoice={invoice} />
              ))}
            </tbody>
            {invoices && invoices.length > 0 && (
              <tfoot className="bg-gray-50 font-medium">
                <tr>
                  <td className="px-4 py-3 sm:pl-6">
                    {invoices.length} {invoices.length === 1 ? 'invoice' : 'invoices'}
                  </td>
                  <td />
                  <td className="px-3 py-3">
                    {formatCurrency(
                      invoices.reduce((sum, inv) => sum + inv.amount, 0),
                    )}
                  </td>
                  <td colSpan={3} />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
