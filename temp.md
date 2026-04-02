# Financial Dashboard Features

## Dashboard Features

### Invoices Management
- **Full CRUD operations** - Create, read, update, delete invoices
- **Quick status toggle** - Click status badge to flip between pending/paid
- **Advanced filtering** - Filter by status (All/Paid/Pending), search by customer/email/amount/date
- **Sortable columns** - Click any column header to sort by customer, amount, date, or status
- **Pagination** - 6 items per page with navigation
- **CSV export** - Download all invoices as a CSV file with date-stamped filename
- **Totals row** - See count and sum total of displayed invoices

### Customers
- View all customers with summary stats
- Search customers by name or email
- See total invoices, pending amounts, and paid amounts per customer
- Click customer names in invoices table to filter

### Summary Page
- Breakdown of invoices by customer
- Shows paid vs. pending amounts per customer
- Responsive mobile/desktop layouts
- Sorted by largest customers first

### API Explorer
- Interactive tool to test the invoices API
- Real-time filtering with status and date range
- Display results in table or JSON format
- See matched invoices out of total count

## API Endpoints

### GET /api/invoices
Fetch invoices with optional filters:
- `?status=pending|paid` - Filter by status
- `?customer_id=123` - Filter by customer
- `?start_date=2024-01-01&end_date=2024-12-31` - Date range
- Returns: formatted amounts + raw cents, customer info, count

### GET /api/customers
Fetch customers with invoice totals:
- `?search=name|email` - Search by name or email
- Returns: total paid/pending amounts, counts, formatted currency

### GET /api/invoices/export
Export invoices as CSV file:
- `?status=pending|paid` - Optional status filter
- Downloads timestamped CSV with headers

## UI/UX Features

- **Status filter tabs** - Quick toggle between All/Paid/Pending invoices
- **Clickable customer names** - Navigate to customer details from invoices
- **Responsive design** - Mobile cards, desktop table layouts
- **Keyboard shortcuts** - Sortable headers with visual indicators
- **Real-time search** - Debounced search across multiple fields
- **URL-based filtering** - Bookmarkable and shareable filtered views

## Technical Architecture

- **Next.js 14** with App Router
- **Server Components** for data fetching
- **Client Components** for interactive filters (Search, StatusFilter, SortableHeader)
- **In-memory data store** for invoices and customers
- **Utility functions** for formatting dates and currency
- **Tailwind CSS** for styling with responsive grid layouts
