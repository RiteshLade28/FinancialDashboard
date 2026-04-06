import Link from 'next/link';
import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import ToggleStatus from '@/app/ui/invoices/toggle-status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { InvoiceForm } from '@/app/lib/definitions';
import { Customer } from '@/app/lib/definitions';
import { StatusChange } from '@/app/lib/in-memory-data';

export default function InvoiceDetails({
  invoice,
  customer,
  statusHistory,
}: {
  invoice: InvoiceForm;
  customer?: Customer | null;
  statusHistory?: StatusChange[];
}) {
  return (
    <div className="rounded-md bg-gray-50 p-6 md:p-8">
      <div className="grid gap-6">
        {/* Customer Info */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Customer Information</h2>
          <div className="rounded-lg bg-white p-4">
            <div className="flex items-center gap-4">
              {customer?.image_url && (
                <Image
                  src={customer.image_url}
                  className="rounded-full"
                  width={48}
                  height={48}
                  alt={`${customer.name}'s profile picture`}
                />
              )}
              <div>
                <p className="text-lg font-medium">{customer?.name || 'Unknown'}</p>
                <a
                  href={`mailto:${customer?.email}`}
                  className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
                >
                  {customer?.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Invoice Details</h2>
          <div className="rounded-lg bg-white p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">{formatCurrency(invoice.amount * 100)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {invoice.date ? formatDateToLocal(invoice.date) : '—'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status:</span>
              <ToggleStatus id={invoice.id} status={invoice.status} />
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div>
            <h2 className="mb-4 text-lg font-semibold">Notes</h2>
            <div className="rounded-lg bg-white p-4">
              <p className="whitespace-pre-wrap text-gray-700">{invoice.notes}</p>
            </div>
          </div>
        )}
        {!invoice.notes && (
          <div>
            <h2 className="mb-4 text-lg font-semibold">Notes</h2>
            <div className="rounded-lg bg-white p-4">
              <p className="text-gray-500 italic">No notes added yet.</p>
            </div>
          </div>
        )}

        {/* Status History */}
        {statusHistory && statusHistory.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-semibold">Status History</h2>
            <div className="rounded-lg bg-white overflow-hidden">
              <div className="space-y-1">
                {statusHistory.map((change, idx) => (
                  <div key={idx} className="border-b last:border-b-0 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {change.from} → {change.to}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(change.timestamp).toLocaleString()}
                      </span>
                    </div>
                    {change.note && (
                      <p className="text-sm text-gray-600">{change.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Back
        </Link>
        <UpdateInvoice id={invoice.id} />
        <DeleteInvoice id={invoice.id} />
      </div>
    </div>
  );
}
