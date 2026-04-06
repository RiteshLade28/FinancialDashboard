'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { store, logActivity } from './in-memory-data';
import { cookies } from 'next/headers';

const InvoiceSchema = z.object({
  customerId: z.string().min(1, 'Please select a customer.'),
  amount: z.coerce.number().gt(0, 'Amount must be greater than $0.'),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string().optional(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = InvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    date: formData.get('date') || undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = Math.round(amount * 100);
  const date = validatedFields.data.date || new Date().toISOString().split('T')[0];

  const newId = crypto.randomUUID();
  store.invoices.push({
    id: newId,
    customer_id: customerId,
    amount: amountInCents,
    status,
    date,
  });
  logActivity('created', newId, `$${amount.toFixed(2)} — ${status}`);

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = InvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = Math.round(amount * 100);

  const index = store.invoices.findIndex((i) => i.id === id);
  if (index !== -1) {
    store.invoices[index] = {
      ...store.invoices[index],
      customer_id: customerId,
      amount: amountInCents,
      status,
    };
    logActivity('updated', id, `$${amount.toFixed(2)} — ${status}`);
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function toggleInvoiceStatus(id: string) {
  const index = store.invoices.findIndex((i) => i.id === id);
  if (index !== -1) {
    const oldStatus = store.invoices[index].status;
    const newStatus = oldStatus === 'paid' ? 'pending' : 'paid';
    store.invoices[index] = {
      ...store.invoices[index],
      status: newStatus,
    };
    logActivity('toggled', id, `${oldStatus} → ${newStatus}`);
  }

  revalidatePath('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  const index = store.invoices.findIndex((i) => i.id === id);
  if (index !== -1) {
    logActivity('deleted', id, 'Invoice removed');
    store.invoices.splice(index, 1);
  }

  revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = store.users.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    return 'Invalid credentials.';
  }

  const cookieStore = await cookies();
  cookieStore.set('session', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  redirect('/dashboard');
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}
