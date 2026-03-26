import {
  CustomerField,
  FormattedCustomersTable,
  InvoiceForm,
  InvoicesTable,
  InvoiceSummary,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { store } from './in-memory-data';

export async function fetchRevenue(): Promise<Revenue[]> {
  return store.revenue;
}

export async function fetchLatestInvoices() {
  const sorted = [...store.invoices].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return sorted.slice(0, 5).map((invoice) => {
    const customer = store.customers.find((c) => c.id === invoice.customer_id);
    return {
      id: invoice.id,
      name: customer?.name ?? 'Unknown',
      image_url: customer?.image_url ?? '',
      email: customer?.email ?? '',
      amount: formatCurrency(invoice.amount),
    };
  });
}

export async function fetchCardData() {
  const numberOfInvoices = store.invoices.length;
  const numberOfCustomers = store.customers.length;
  const totalPaidInvoices = formatCurrency(
    store.invoices
      .filter((i) => i.status === 'paid')
      .reduce((sum, i) => sum + i.amount, 0),
  );
  const totalPendingInvoices = formatCurrency(
    store.invoices
      .filter((i) => i.status === 'pending')
      .reduce((sum, i) => sum + i.amount, 0),
  );

  return {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  };
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
  status?: string,
): Promise<InvoicesTable[]> {
  const q = query.toLowerCase();

  const filtered = store.invoices
    .filter((invoice) => !status || invoice.status === status)
    .map((invoice) => {
      const customer = store.customers.find(
        (c) => c.id === invoice.customer_id,
      );
      return {
        id: invoice.id,
        customer_id: invoice.customer_id,
        name: customer?.name ?? '',
        email: customer?.email ?? '',
        image_url: customer?.image_url ?? '',
        date: invoice.date,
        amount: invoice.amount,
        status: invoice.status,
      };
    })
    .filter(
      (inv) =>
        !q ||
        inv.name.toLowerCase().includes(q) ||
        inv.email.toLowerCase().includes(q) ||
        inv.amount.toString().includes(q) ||
        inv.date.includes(q) ||
        inv.status.toLowerCase().includes(q),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  return filtered.slice(offset, offset + ITEMS_PER_PAGE);
}

export async function fetchInvoicesPages(
  query: string,
  status?: string,
): Promise<number> {
  const q = query.toLowerCase();

  const filtered = store.invoices
    .filter((invoice) => !status || invoice.status === status)
    .filter((invoice) => {
      const customer = store.customers.find(
        (c) => c.id === invoice.customer_id,
      );
      return (
        !q ||
        (customer?.name ?? '').toLowerCase().includes(q) ||
        (customer?.email ?? '').toLowerCase().includes(q) ||
        invoice.amount.toString().includes(q) ||
        invoice.date.includes(q) ||
        invoice.status.toLowerCase().includes(q)
      );
    });

  return Math.ceil(filtered.length / ITEMS_PER_PAGE);
}

export async function fetchInvoiceById(
  id: string,
): Promise<InvoiceForm | undefined> {
  const invoice = store.invoices.find((i) => i.id === id);
  if (!invoice) return undefined;

  return {
    id: invoice.id,
    customer_id: invoice.customer_id,
    amount: invoice.amount / 100,
    status: invoice.status,
  };
}

export async function fetchCustomers(): Promise<CustomerField[]> {
  return store.customers
    .map((c) => ({ id: c.id, name: c.name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function fetchInvoiceSummary(): Promise<InvoiceSummary[]> {
  return store.customers
    .map((customer) => {
      const customerInvoices = store.invoices.filter(
        (i) => i.customer_id === customer.id,
      );
      const paid = customerInvoices.filter((i) => i.status === 'paid');
      const pending = customerInvoices.filter((i) => i.status === 'pending');
      return {
        id: customer.id,
        name: customer.name,
        image_url: customer.image_url,
        totalPaid: paid.reduce((sum, i) => sum + i.amount, 0),
        totalPending: pending.reduce((sum, i) => sum + i.amount, 0),
        paidCount: paid.length,
        pendingCount: pending.length,
      };
    })
    .sort((a, b) => b.totalPaid + b.totalPending - (a.totalPaid + a.totalPending));
}

export async function fetchFilteredCustomers(
  query: string,
): Promise<FormattedCustomersTable[]> {
  const q = query.toLowerCase();

  return store.customers
    .filter(
      (c) =>
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q),
    )
    .map((customer) => {
      const customerInvoices = store.invoices.filter(
        (i) => i.customer_id === customer.id,
      );
      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
        total_invoices: customerInvoices.length,
        total_pending: formatCurrency(
          customerInvoices
            .filter((i) => i.status === 'pending')
            .reduce((sum, i) => sum + i.amount, 0),
        ),
        total_paid: formatCurrency(
          customerInvoices
            .filter((i) => i.status === 'paid')
            .reduce((sum, i) => sum + i.amount, 0),
        ),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
