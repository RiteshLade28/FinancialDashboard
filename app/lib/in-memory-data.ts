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

export const store = {
  users: [...userData],
  customers: [...customerData],
  invoices: invoicesWithIds,
  revenue: [...revenueData],
};
