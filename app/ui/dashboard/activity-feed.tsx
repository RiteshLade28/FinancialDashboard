import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRecentActivity } from '@/app/lib/data';

const iconMap = {
  created: PlusCircleIcon,
  updated: PencilSquareIcon,
  deleted: TrashIcon,
  toggled: ArrowPathIcon,
};

const colorMap = {
  created: 'text-green-600 bg-green-50',
  updated: 'text-blue-600 bg-blue-50',
  deleted: 'text-red-600 bg-red-50',
  toggled: 'text-orange-600 bg-orange-50',
};

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function ActivityFeed() {
  const activity = await fetchRecentActivity(8);

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Activity
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        {activity.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-400">
            No activity yet. Create, edit, or toggle an invoice to see it here.
          </p>
        ) : (
          <div className="space-y-3">
            {activity.map((entry) => {
              const Icon = iconMap[entry.action];
              const color = colorMap[entry.action];
              return (
                <div
                  key={entry.id}
                  className="flex items-start gap-3 rounded-lg bg-white p-3"
                >
                  <div className={`rounded-full p-1.5 ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{entry.customerName}</span>
                      {' — '}
                      <span className="capitalize">{entry.action}</span>
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {entry.detail}
                    </p>
                  </div>
                  <p className="shrink-0 text-xs text-gray-400">
                    {timeAgo(entry.timestamp)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
