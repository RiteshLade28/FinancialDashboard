import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';

export default async function LatestInvoices({
  latestInvoices,
}: {
  latestInvoices: LatestInvoice[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <Link
                key={invoice.id}
                href={`/dashboard/invoices/${invoice.id}/view`}
                className={clsx(
                  'flex flex-row items-center justify-between py-4 hover:bg-gray-50 transition-colors',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <a href={`mailto:${invoice.email}`} className="hidden text-sm text-gray-500 hover:text-blue-600 hover:underline sm:block">
                      {invoice.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={clsx('inline-block h-2 w-2 rounded-full', {
                      'bg-green-500': invoice.status === 'paid',
                      'bg-orange-400': invoice.status === 'pending',
                    })}
                    title={invoice.status}
                  />
                  <p
                    className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                  >
                    {invoice.amount}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
