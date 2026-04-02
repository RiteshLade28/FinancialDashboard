import { store } from '@/app/lib/in-memory-data';
import { formatCurrency } from '@/app/lib/utils';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();

    let customers = store.customers;

    if (search) {
      customers = customers.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.email.toLowerCase().includes(search),
      );
    }

    const enriched = customers.map((customer) => {
      const invoices = store.invoices.filter(
        (i) => i.customer_id === customer.id,
      );
      const paid = invoices.filter((i) => i.status === 'paid');
      const pending = invoices.filter((i) => i.status === 'pending');

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
        total_invoices: invoices.length,
        total_paid: formatCurrency(
          paid.reduce((sum, i) => sum + i.amount, 0),
        ),
        total_paid_cents: paid.reduce((sum, i) => sum + i.amount, 0),
        total_pending: formatCurrency(
          pending.reduce((sum, i) => sum + i.amount, 0),
        ),
        total_pending_cents: pending.reduce((sum, i) => sum + i.amount, 0),
        paid_count: paid.length,
        pending_count: pending.length,
      };
    });

    return Response.json({
      count: enriched.length,
      customers: enriched,
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch customers' },
      { status: 500 },
    );
  }
}
