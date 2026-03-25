import { lusitana } from '@/app/ui/fonts';
import APIExplorer from '@/app/ui/api-explorer';
import { fetchCardData } from '@/app/lib/data';

export default async function Page() {
  const cardData = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        API Explorer
      </h1>
      <p className="mb-6 text-gray-600">
        Test the invoices API with filters. The endpoint is{' '}
        <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
          GET /api/invoices
        </code>
      </p>
      <APIExplorer totalInvoices={cardData.numberOfInvoices} />
    </main>
  );
}
