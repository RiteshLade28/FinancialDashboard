'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { permanentlyDeleteInvoice } from '@/app/lib/actions';

export default function PermanentDeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (confirm('Permanently delete this invoice? This cannot be undone.')) {
      await permanentlyDeleteInvoice(id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-md border p-2 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      title="Delete permanently"
    >
      <XMarkIcon className="w-4" />
    </button>
  );
}
