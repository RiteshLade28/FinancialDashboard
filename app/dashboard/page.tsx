import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import PaymentProgress from '@/app/ui/dashboard/payment-progress';
import ActivityFeed from '@/app/ui/dashboard/activity-feed';
import WelcomeBanner from '@/app/ui/dashboard/welcome-banner';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
  fetchOverdueCount,
  fetchPaymentProgress,
} from '@/app/lib/data';

export default async function Page() {
  const [revenue, latestInvoices, cardData, overdueCount, progress] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
    fetchOverdueCount(),
    fetchPaymentProgress(),
  ]);

  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = cardData;

  return (
    <main>
      <WelcomeBanner
        pendingCount={progress.pendingCount}
        overdueCount={overdueCount}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
        <Card title="Overdue" value={overdueCount} type="overdue" />
      </div>
      <div className="mt-6">
        <PaymentProgress />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <ActivityFeed />
      </div>
    </main>
  );
}
