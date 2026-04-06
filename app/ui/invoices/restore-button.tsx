'use client';

import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { restoreInvoice } from '@/app/lib/actions';

export default function RestoreButton({ id }: { id: string }) {
  return (
    <button
      onClick={() => restoreInvoice(id)}
      className="rounded-md border p-2 hover:border-green-200 hover:bg-green-50 hover:text-green-600"
      title="Restore invoice"
    >
      <ArrowUturnLeftIcon className="w-4" />
    </button>
  );
}
