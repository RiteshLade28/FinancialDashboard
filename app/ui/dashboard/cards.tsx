import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  overdue: ExclamationTriangleIcon,
};

const hrefMap = {
  collected: '/dashboard/invoices?status=paid',
  pending: '/dashboard/invoices?status=pending',
  invoices: '/dashboard/invoices',
  customers: '/dashboard/customers',
  overdue: '/dashboard/outstanding',
};

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected' | 'overdue';
}) {
  const Icon = iconMap[type];
  const href = hrefMap[type];

  return (
    <Link
      href={href}
      className="rounded-xl bg-gray-50 p-2 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </Link>
  );
}
