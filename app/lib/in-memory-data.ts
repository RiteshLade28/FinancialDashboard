import {
  customers as customerData,
  invoices as invoiceData,
  revenue as revenueData,
  users as userData,
} from './placeholder-data';

let idCounter = 0;
function generateId(): string {
  idCounter++;
  return `inv-${Date.now().toString(36)}-${idCounter.toString(36)}`;
}

const invoicesWithIds = invoiceData.map((invoice) => ({
  id: generateId(),
  ...invoice,
  status: invoice.status as 'pending' | 'paid',
}));

export type ActivityEntry = {
  id: string;
  action: 'created' | 'updated' | 'deleted' | 'toggled';
  invoiceId: string;
  customerName: string;
  detail: string;
  timestamp: number;
};

export const store = {
  users: [...userData],
  customers: [...customerData],
  invoices: invoicesWithIds,
  revenue: [...revenueData],
  activity: [] as ActivityEntry[],
};

export function logActivity(
  action: ActivityEntry['action'],
  invoiceId: string,
  detail: string,
) {
  const invoice = store.invoices.find((i) => i.id === invoiceId);
  const customer = store.customers.find(
    (c) => c.id === invoice?.customer_id,
  );
  store.activity.unshift({
    id: crypto.randomUUID(),
    action,
    invoiceId,
    customerName: customer?.name ?? 'Unknown',
    detail,
    timestamp: Date.now(),
  });
  // Keep only last 50 entries
  if (store.activity.length > 50) {
    store.activity.length = 50;
  }
}
