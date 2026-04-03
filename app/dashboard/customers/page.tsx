import CustomersTable from '@/app/ui/customers/table';
import SortDropdown from '@/app/ui/customers/sort-dropdown';
import { fetchFilteredCustomers } from '@/app/lib/data';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    sort?: string;
    order?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const sort = searchParams?.sort || '';
  const order = searchParams?.order || '';
  const customers = await fetchFilteredCustomers(query, sort, order);

  return (
    <main>
      <CustomersTable customers={customers} sortDropdown={<SortDropdown />} />
    </main>
  );
}
