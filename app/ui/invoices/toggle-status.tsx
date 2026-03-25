'use client';

import { toggleInvoiceStatus } from '@/app/lib/actions';
import InvoiceStatus from '@/app/ui/invoices/status';

export default function ToggleStatus({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const toggleWithId = toggleInvoiceStatus.bind(null, id);

  return (
    <form action={toggleWithId}>
      <button type="submit" className="cursor-pointer" title="Click to toggle status">
        <InvoiceStatus status={status} />
      </button>
    </form>
  );
}
