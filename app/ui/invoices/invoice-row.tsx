import Image from 'next/image';
import Link from 'next/link';
import { ViewInvoice, UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import ToggleStatus from '@/app/ui/invoices/toggle-status';
import { formatDateToLocal, formatCurrency, calculateDaysPending } from '@/app/lib/utils';
import { InvoicesTable } from '@/app/lib/definitions';

export default function InvoiceRow({ invoice }: { invoice: InvoicesTable }) {
  const daysPending = calculateDaysPending(invoice.date);
  const isOverdue = invoice.status === 'pending' && daysPending > 30;

  return (
    <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <Image
            src={invoice.image_url}
            className="rounded-full"
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
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <a href={`mailto:${invoice.email}`} className="text-gray-600 hover:text-blue-600 hover:underline">
          {invoice.email}
        </a>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        {formatCurrency(invoice.amount)}
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="flex items-center gap-2">
          {isOverdue && (
            <span className="inline-block rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
              Overdue
            </span>
          )}
          <span>{formatDateToLocal(invoice.date)}</span>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <ToggleStatus id={invoice.id} status={invoice.status} />
      </td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <ViewInvoice id={invoice.id} />
          <UpdateInvoice id={invoice.id} />
          <DeleteInvoice id={invoice.id} />
        </div>
      </td>
    </tr>
  );
}
