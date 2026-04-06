'use client';

import { useState } from 'react';
import { toggleInvoiceStatus } from '@/app/lib/actions';
import InvoiceStatus from '@/app/ui/invoices/status';

const quickNotes = {
  paid: ['Payment received', 'Wire transfer', 'Credit card', 'Check cleared'],
  pending: ['Payment refunded', 'Payment bounced', 'Dispute opened', 'Correction'],
};

export default function ToggleStatus({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const newStatus = status === 'paid' ? 'pending' : 'paid';

  const handleSubmit = async () => {
    setSubmitting(true);
    await toggleInvoiceStatus(id, note);
    setOpen(false);
    setNote('');
    setSubmitting(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer"
        title="Click to toggle status"
      >
        <InvoiceStatus status={status} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => { setOpen(false); setNote(''); }}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold">
              Mark as {newStatus === 'paid' ? 'Paid' : 'Pending'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Change status from{' '}
              <span className="font-medium">{status}</span> to{' '}
              <span className="font-medium">{newStatus}</span>
            </p>

            {/* Quick note buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              {quickNotes[newStatus as keyof typeof quickNotes].map((qn) => (
                <button
                  key={qn}
                  type="button"
                  onClick={() => setNote(qn)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    note === qn
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {qn}
                </button>
              ))}
            </div>

            {/* Custom note input */}
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note (optional)"
              className="mt-3 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-2 placeholder:text-gray-400"
              autoFocus
            />

            {/* Actions */}
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => { setOpen(false); setNote(''); }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className={`rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50 ${
                  newStatus === 'paid'
                    ? 'bg-green-600 hover:bg-green-500'
                    : 'bg-orange-500 hover:bg-orange-400'
                }`}
              >
                {submitting ? 'Saving...' : `Mark as ${newStatus === 'paid' ? 'Paid' : 'Pending'}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
