import { store } from '@/app/lib/in-memory-data';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') as 'pending' | 'paid' | null;
    const customerId = url.searchParams.get('customer_id');
    const startDate = url.searchParams.get('start_date');
    const endDate = url.searchParams.get('end_date');

    let invoices = store.invoices;

    // Filter by status
    if (status) {
      invoices = invoices.filter((i) => i.status === status);
    }

    // Filter by customer
    if (customerId) {
      invoices = invoices.filter((i) => i.customer_id === customerId);
    }

    // Filter by date range
    if (startDate) {
      invoices = invoices.filter((i) => i.date >= startDate);
    }
    if (endDate) {
      invoices = invoices.filter((i) => i.date <= endDate);
    }

    // Enrich with customer info
    const enriched = invoices.map((invoice) => {
      const customer = store.customers.find((c) => c.id === invoice.customer_id);
      return {
        id: invoice.id,
        customer_id: invoice.customer_id,
        customer_name: customer?.name,
        customer_email: customer?.email,
        amount: formatCurrency(invoice.amount),
        amount_cents: invoice.amount,
        status: invoice.status,
        date: invoice.date,
        date_formatted: formatDateToLocal(invoice.date),
      };
    });

    return Response.json({
      count: enriched.length,
      invoices: enriched,
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 },
    );
  }
}
