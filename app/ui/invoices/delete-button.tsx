'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteInvoice } from '@/app/lib/actions';

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      await deleteInvoice(id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-md border p-2 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" />
    </button>
  );
}
