# Financial Dashboard — Knowledge Base

## Overview

The Financial Dashboard is a Next.js application for managing invoices, tracking customer payments, and generating financial reports. It provides a full-featured UI with real-time filtering, sorting, and export capabilities, backed by a REST API.

## Dashboard Pages

### Home (`/dashboard`)
The main landing page displays four key metrics cards (Total Collected, Total Pending, Total Invoices, Total Customers), a 12-month revenue bar chart, and the 5 most recent invoices.

### Invoices (`/dashboard/invoices`)
Full invoice management table with:
- **CRUD operations** — Create, edit, and soft-delete invoices (deleted invoices move to Trash)
- **Status toggle with notes** — Click any status badge to open a confirmation dialog where you can add a payment note before changing status
- **Status filter tabs** — Toggle between All, Paid, and Pending views
- **Sortable columns** — Click Customer, Amount, Date, or Status headers to sort ascending/descending
- **Search** — Debounced search across customer name, email, amount, date, and status
- **CSV export** — Download all invoices as a timestamped CSV file
- **Totals row** — Footer showing count and sum of displayed invoices
- **Pagination** — 6 invoices per page with navigation controls
- **Clickable customer names** — Navigate directly to filtered customer view

### Customers (`/dashboard/customers`)
View all customers with their invoice summaries. Search by name or email. Each row shows total invoices, total pending, and total paid amounts.

### Summary (`/dashboard/summary`)
Per-customer invoice breakdown showing paid and pending amounts with counts. Displays top-level cards for collected, pending, and total invoice counts. Sorted by largest customers first. Responsive mobile card and desktop table layouts.

### Outstanding (`/dashboard/outstanding`)
Dedicated view for pending invoices requiring attention:
- **Summary card** — Total outstanding amount, count, and average days pending
- **Color-coded urgency** — Red (>30 days), orange (>14 days), yellow (<14 days)
- **Sorted by age** — Oldest pending invoices appear first
- **Customer links** — Click to navigate to customer details
- **Success state** — Displays confirmation when all invoices are paid

### Reports (`/dashboard/reports`)
Financial analytics and statistics:
- **Key metrics** — Average invoice amount, pending count, paid count, total customers
- **Oldest pending invoice** — Highlights the longest-outstanding invoice with customer name, amount, date, and days pending
- **Top 5 customers** — Ranked by total invoice amount with invoice counts

### Trash (`/dashboard/trash`)
Deleted invoices are moved to trash instead of being permanently removed:
- **Soft delete** — Clicking delete on an invoice moves it to trash with a confirmation prompt
- **Restore** — Click the restore button to move an invoice back to the active list
- **Permanent delete** — Click the X button to permanently remove an invoice (with confirmation)
- **Deletion timestamp** — Shows when each invoice was deleted
- **Responsive layout** — Mobile cards and desktop table views

### How to Delete an Invoice
1. Navigate to the Invoices page (`/dashboard/invoices`)
2. Find the invoice you want to delete
3. Click the trash icon on the invoice row
4. Confirm the "Move this invoice to trash?" prompt
5. The invoice is moved to Trash (`/dashboard/trash`)
6. From Trash, you can **restore** the invoice or **permanently delete** it
7. Permanent deletion requires a second confirmation and cannot be undone

### How to Toggle Payment Status
Toggling an invoice's payment status now uses a confirmation dialog with optional notes:

1. Navigate to the Invoices page (`/dashboard/invoices`)
2. Find the invoice whose status you want to change
3. Click the status badge (Paid or Pending) on the invoice row
4. A dialog opens showing the current and new status
5. **Quick notes** — Click a suggested reason (e.g., "Payment received", "Wire transfer", "Payment refunded")
6. **Custom note** — Or type a custom note in the text field
7. Click **"Mark as Paid"** or **"Mark as Pending"** to confirm
8. The status change and note are recorded in the activity feed and status history

**Quick note suggestions when marking as Paid:**
- Payment received
- Wire transfer
- Credit card
- Check cleared

**Quick note suggestions when marking as Pending:**
- Payment refunded
- Payment bounced
- Dispute opened
- Correction

**Note:** Status changes are tracked with timestamps and notes in the status history. All toggle actions appear in the Activity Feed on the dashboard.

### API Explorer (`/dashboard/api-explorer`)
Interactive tool for testing the invoices API:
- Filter by status (pending/paid) and date range
- Fetch results in real time from `/api/invoices`
- Toggle between table view and raw JSON response
- Shows matched count out of total invoices

## REST API

### GET /api/invoices
Retrieve invoices with optional filtering:
- `?status=pending|paid` — Filter by invoice status
- `?customer_id=<id>` — Filter by specific customer
- `?start_date=YYYY-MM-DD` — Invoices from this date
- `?end_date=YYYY-MM-DD` — Invoices until this date

Response includes count, formatted currency amounts, raw cents, customer name/email, and formatted dates.

### GET /api/customers
Retrieve customers with computed invoice totals:
- `?search=<term>` — Search by name or email

Response includes total paid/pending amounts (formatted + raw cents), invoice counts per status.

### GET /api/invoices/export
Download invoices as CSV:
- `?status=pending|paid` — Optional status filter
- Returns `text/csv` with `Content-Disposition` header
- Filename: `invoices-YYYY-MM-DD.csv`
- Columns: Customer, Email, Amount, Date, Status

## Navigation Structure

| Page | Route | Icon |
|------|-------|------|
| Home | `/dashboard` | HomeIcon |
| Invoices | `/dashboard/invoices` | DocumentDuplicateIcon |
| Customers | `/dashboard/customers` | UserGroupIcon |
| Summary | `/dashboard/summary` | ChartBarIcon |
| Outstanding | `/dashboard/outstanding` | ClockIcon |
| Reports | `/dashboard/reports` | ChartPieIcon |
| API | `/dashboard/api-explorer` | CommandLineIcon |
| Trash | `/dashboard/trash` | TrashIcon |

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Rendering**: Server Components for data fetching, Client Components for interactivity
- **Styling**: Tailwind CSS with responsive breakpoints
- **Data**: In-memory store with typed models (Invoice, Customer, Revenue)
- **Fonts**: Lusitana for headings, Inter for body text
- **Icons**: Heroicons v2 outline set
- **State**: URL search params for filters, sort, and pagination (bookmarkable views)

## Key Patterns

- **URL-driven state** — All filtering (search, status, sort, order, page) is stored in URL search params, making views bookmarkable and shareable
- **Server/client split** — Data fetching happens in server components; interactive controls (Search, StatusFilter, SortableHeader, ToggleStatus) are client components that update URL params
- **Responsive design** — Mobile uses card layouts, desktop uses tables, with Tailwind `md:` breakpoints
- **Consistent data enrichment** — API endpoints return both formatted strings and raw values for flexibility

## Testing change
## Testing change - 2
## Testing change - 3
## Testing change - 4
## Testing change - 5
## Testing change - 6
## Testing change - 7
## Testing change - 8
## Testing change - 9
## Testing change - 10
## Testing change - 11
## Testing change - 12
## Testing change - 13
## Testing change - 14
## Testing change - 15
## Testing change - 16
## Testing change - 17
## Testing change - 18
## Testing change - 19
## Testing change - 20
testing change - 1775499221
testing change - 1775499883
testing change - 1775500295
testing change - 1775500765
testing change - 1775501020
testing change - 1775501553
testing change - 1775504056
