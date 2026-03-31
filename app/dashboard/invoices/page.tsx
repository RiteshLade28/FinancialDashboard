import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import StatusFilter from '@/app/ui/invoices/status-filter';
import { CreateInvoice, ExportInvoices } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { fetchInvoicesPages } from '@/app/lib/data';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    status?: string;
    sort?: string;
    order?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const status = searchParams?.status || '';
  const sort = searchParams?.sort || '';
  const order = searchParams?.order || '';
  const totalPages = await fetchInvoicesPages(query, status);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <div className="flex gap-2">
          <ExportInvoices />
          <CreateInvoice />
        </div>
      </div>
      <div className="mt-3">
        <StatusFilter />
      </div>
      <Table query={query} currentPage={currentPage} status={status} sort={sort} order={order} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
