# Financial Dashboard API Guide

## Overview

The Financial Dashboard provides a comprehensive set of APIs for managing and querying invoice data. This guide covers all available endpoints, request parameters, and response formats.

## Base URL

```
GET http://localhost:3000/api
```

## Endpoints

### GET /api/invoices

Retrieve invoices with optional filtering and enrichment.

#### Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `status` | string | Filter by invoice status: `pending` or `paid` | `?status=pending` |
| `customer_id` | string | Filter by customer ID | `?customer_id=123` |
| `start_date` | string | Filter invoices from this date (inclusive) | `?start_date=2024-01-01` |
| `end_date` | string | Filter invoices until this date (inclusive) | `?end_date=2024-12-31` |

#### Response

```json
{
  "count": 5,
  "invoices": [
    {
      "id": "invoice-001",
      "customer_id": "customer-123",
      "customer_name": "John Doe",
      "customer_email": "john@example.com",
      "amount": "$1,500.00",
      "amount_cents": 150000,
      "status": "pending",
      "date": "2024-03-15",
      "date_formatted": "Mar 15, 2024"
    }
  ]
}
```

#### Examples

**All invoices:**
```
GET /api/invoices
```

**Pending invoices only:**
```
GET /api/invoices?status=pending
```

**Paid invoices for a specific customer:**
```
GET /api/invoices?customer_id=123&status=paid
```

**Invoices in date range:**
```
GET /api/invoices?start_date=2024-01-01&end_date=2024-12-31
```

**Combined filters:**
```
GET /api/invoices?status=pending&start_date=2024-03-01&customer_id=456
```

## Response Fields

- **count**: Total number of invoices matching the filters
- **invoices**: Array of invoice objects
  - **id**: Unique invoice identifier
  - **customer_id**: Reference to the customer
  - **customer_name**: Customer display name
  - **customer_email**: Customer contact email
  - **amount**: Formatted currency string
  - **amount_cents**: Raw amount in cents for calculations
  - **status**: Current invoice status (`pending` or `paid`)
  - **date**: ISO date string
  - **date_formatted**: Human-readable date

## Error Handling

If an error occurs, the API returns:

```json
{
  "error": "Failed to fetch invoices"
}
```

With HTTP status code `500`.

## Features

### Dashboard Pages

#### Dashboard Home
- Displays key metrics: total invoices, pending, and collected amounts
- Shows recent invoice activity
- Provides quick access to invoice management

#### Invoices Table
- View all invoices in a sortable table
- Filter and search invoices
- Quick status toggle (click status badge to change between pending/paid)
- Edit and delete actions

#### Summary Page
- Breakdown of invoices by customer
- Shows paid vs. pending amounts per customer
- Displays invoice counts by status
- Responsive mobile and desktop layouts

#### API Explorer
- Interactive API testing tool
- Real-time filtering and results display
- JSON response viewer
- Useful for testing API integrations

### Invoice Status Toggle

Quickly change invoice status without navigating to the edit page:
1. Go to the Invoices table
2. Click on any status badge (Paid/Pending)
3. Status updates immediately

## Integration Examples

### React/Next.js

```typescript
const response = await fetch('/api/invoices?status=pending');
const data = await response.json();

data.invoices.forEach(invoice => {
  console.log(`${invoice.customer_name}: ${invoice.amount}`);
});
```

### cURL

```bash
curl "http://localhost:3000/api/invoices?status=paid&start_date=2024-03-01"
```

### JavaScript Fetch with Date Range

```javascript
const endDate = new Date();
const startDate = new Date();
startDate.setMonth(startDate.getMonth() - 1);

const params = new URLSearchParams({
  start_date: startDate.toISOString().split('T')[0],
  end_date: endDate.toISOString().split('T')[0],
});

fetch(`/api/invoices?${params}`);
```

## Best Practices

1. **Pagination**: For large datasets, use date range filters to paginate results
2. **Performance**: Combine filters to reduce response size
3. **Error Handling**: Always handle the 500 error response
4. **Timezone**: Dates are in ISO 8601 format; client handles timezone conversion
5. **Currency**: Use `amount_cents` for calculations; display formatted `amount` to users

## Features Roadmap

- [ ] Pagination and sorting parameters
- [ ] Invoice creation via API
- [ ] Batch status updates
- [ ] Export to CSV/PDF
- [ ] Webhook notifications for status changes
- [ ] Rate limiting and authentication

## Support

For issues or feature requests, please refer to the project documentation or contact the development team.

## Rate Limiting

The API currently does not enforce rate limits. However, for production use:
- Keep requests under 100 per minute per client
- Use caching for repeated queries
- Batch filter parameters instead of making multiple single-filter requests
