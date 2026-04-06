'use client';

import { lusitana } from '@/app/ui/fonts';

export default function WelcomeBanner({
  pendingCount,
  overdueCount,
}: {
  pendingCount: number;
  overdueCount: number;
}) {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const date = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="mb-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
      <h1 className={`${lusitana.className} text-2xl md:text-3xl`}>
        {greeting}!
      </h1>
      <p className="mt-1 text-sm text-blue-100">{date}</p>
      {(pendingCount > 0 || overdueCount > 0) && (
        <p className="mt-3 text-sm text-blue-50">
          You have{' '}
          <span className="font-semibold">{pendingCount} pending</span>
          {overdueCount > 0 && (
            <>
              {' '}and{' '}
              <span className="font-semibold text-orange-200">
                {overdueCount} overdue
              </span>
            </>
          )}{' '}
          invoice{pendingCount !== 1 ? 's' : ''} to review.
        </p>
      )}
    </div>
  );
}
