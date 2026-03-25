'use client';

import { useState } from 'react';
import { formatDateToLocal } from '@/app/lib/utils';

type Invoice = {
  id: string;
  customer_id: string;
  customer_name?: string;
  customer_email?: string;
  amount: string;
  amount_cents: number;
  status: string;
  date: string;
  date_formatted: string;
};

type ApiResponse = {
  count: number;
  invoices: Invoice[];
};

export default function APIExplorer({ totalInvoices }: { totalInvoices: number }) {
  const [status, setStatus] = useState<'' | 'pending' | 'paid'>('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showJson, setShowJson] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (dateRange.start) params.append('start_date', dateRange.start);
      if (dateRange.end) params.append('end_date', dateRange.end);

      const response = await fetch(`/api/invoices?${params.toString()}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch:', error);
      setData({ count: 0, invoices: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStatus('');
    setDateRange({ start: '', end: '' });
    setData(null);
    setShowJson(false);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="rounded-xl bg-gray-50 p-6">
        <h2 className="mb-4 text-lg font-medium">Filters</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as '' | 'pending' | 'paid')}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleFetch}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Fetch'}
          </button>
          <button
            onClick={handleReset}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Reset
          </button>
          {data && (
            <button
              onClick={() => setShowJson(!showJson)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              {showJson ? 'Hide' : 'Show'} JSON
            </button>
          )}
        </div>
      </div>

      {/* JSON Response */}
      {data && showJson && (
        <div className="rounded-xl bg-gray-50 p-6">
          <h2 className="mb-4 text-lg font-medium">Response</h2>
          <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-xs text-gray-100">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {/* Results Table */}
      {data && data.count > 0 && (
        <div className="rounded-xl bg-gray-50 p-6">
          <h2 className="mb-4 text-lg font-medium">
            Results ({data.count} of {totalInvoices})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-4 py-3">{invoice.customer_name}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {invoice.customer_email}
                    </td>
                    <td className="px-4 py-3 font-medium">{invoice.amount}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {invoice.date_formatted}
                    </td>
                    <td className="px-4 py-3">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No Results */}
      {data && data.count === 0 && (
        <div className="rounded-xl bg-gray-50 p-6 text-center">
          <p className="text-gray-500">No invoices found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
