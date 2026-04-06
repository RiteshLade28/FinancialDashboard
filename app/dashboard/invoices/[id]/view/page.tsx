import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import InvoiceDetails from '@/app/ui/invoices/invoice-details';
import { fetchInvoiceById, fetchStatusHistory } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { store } from '@/app/lib/in-memory-data';

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const [invoice, statusHistory] = await Promise.all([
    fetchInvoiceById(id),
    fetchStatusHistory(id),
  ]);

  if (!invoice) {
    notFound();
  }

  const fullInvoice = store.invoices.find((i) => i.id === id);
  const customer = fullInvoice
    ? store.customers.find((c) => c.id === fullInvoice.customer_id)
    : null;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Invoice Details',
            href: `/dashboard/invoices/${id}/view`,
            active: true,
          },
        ]}
      />
      <InvoiceDetails invoice={invoice} customer={customer} statusHistory={statusHistory} />
    </main>
  );
}
