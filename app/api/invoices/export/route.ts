import { store } from '@/app/lib/in-memory-data';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') as 'pending' | 'paid' | null;

    let invoices = store.invoices;

    if (status) {
      invoices = invoices.filter((i) => i.status === status);
    }

    const headers = ['Customer', 'Email', 'Amount', 'Date', 'Status'];

    const rows = invoices.map((invoice) => {
      const customer = store.customers.find(
        (c) => c.id === invoice.customer_id,
      );
      return [
        customer?.name ?? '',
        customer?.email ?? '',
        formatCurrency(invoice.amount),
        formatDateToLocal(invoice.date),
        invoice.status,
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','),
      ),
    ].join('\n');

    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="invoices-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to export invoices' },
      { status: 500 },
    );
  }
}
