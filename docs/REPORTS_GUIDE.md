# Reports & Analytics Guide

## Overview

The Financial Dashboard provides a comprehensive **Reports** page that surfaces key business metrics, customer rankings, and outstanding invoice insights — all in a single, at-a-glance view.

## Accessing the Reports Page

1. Log in to the Financial Dashboard.
2. Click **"Reports"** in the left sidebar navigation.
3. The page loads instantly with pre-computed metrics from your invoice data.

## Key Metrics Cards

At the top of the Reports page, you'll see four metric cards displayed in a responsive grid:

| Card | Description | How It's Calculated |
|------|-------------|---------------------|
| **Avg Invoice Amount** | The average dollar value across all invoices | Sum of all invoice amounts ÷ total invoice count |
| **Pending Count** | Number of invoices still awaiting payment | Count of invoices with status `pending` |
| **Paid Count** | Number of invoices that have been paid | Count of invoices with status `paid` |
| **Total Customers** | Total number of unique customers | Count of all customer records |

### Reading the Metrics

- A high **Pending Count** relative to **Paid Count** may indicate collection issues.
- Compare the **Avg Invoice Amount** over time to track pricing trends.
- **Total Customers** helps you gauge business growth.

## Oldest Pending Invoice Section

Below the metrics cards, you'll find a highlighted blue card showing your **oldest pending invoice**:

- **Customer**: The customer who owes this invoice
- **Amount**: The dollar amount outstanding
- **Date**: When the invoice was originally created
- **Days Pending**: How many days since the invoice was created

This section helps you prioritize collection efforts — the longest-outstanding invoice likely needs the most attention.

> **Tip**: If you don't see the "Oldest Pending Invoice" card, that means all your invoices are paid. Congratulations!

## Top 5 Customers by Amount

The bottom section displays a table ranking your **Top 5 customers by total invoice value**:

| Column | Description |
|--------|-------------|
| **Customer** | Customer name |
| **Total** | Sum of all their invoice amounts |
| **Invoice Count** | How many invoices they have |

### Use Cases

- **Identify your biggest clients** — Focus retention efforts on your highest-value customers.
- **Spot concentration risk** — If one customer accounts for most of your revenue, consider diversifying.
- **Compare invoice frequency** — A customer with many small invoices vs. few large ones may need different payment terms.

## Outstanding Invoices Page

For a detailed view of all pending invoices, navigate to the **Outstanding** page from the sidebar. This page provides:

### Summary Card

A prominent orange summary card with three metrics:
- **Total Outstanding** — The total dollar amount of all unpaid invoices
- **Invoice Count** — How many invoices are pending
- **Avg Days Pending** — The average number of days invoices have been outstanding

### Outstanding Invoices Table

The table lists every pending invoice, sorted by **days pending** (longest first):

| Column | Description |
|--------|-------------|
| **Customer** | Customer name with avatar (clickable — links to customer detail) |
| **Amount** | Invoice amount in formatted currency |
| **Date** | When the invoice was created |
| **Days Pending** | Color-coded badge showing urgency |

### Color-Coded Urgency

The "Days Pending" column uses color coding to indicate urgency:

| Days Pending | Badge Color | Meaning |
|-------------|-------------|---------|
| **0–14 days** | Yellow | Recent — still within normal payment terms |
| **15–30 days** | Orange | Approaching overdue — consider a reminder |
| **30+ days** | Red | Overdue — requires immediate attention |

### Mobile-Responsive Design

On mobile devices, the Outstanding page switches from a table layout to stacked cards. Each card shows:
- Customer avatar and name
- Invoice date
- Days pending badge
- Invoice amount

### Empty State

When all invoices are paid, the page displays a green success message: **"No outstanding invoices — All invoices have been paid!"**

## Frequently Asked Questions

**Q: How often are report metrics updated?**
A: Metrics are computed in real-time from the current invoice data. Every time you load the Reports page, you see the latest numbers.

**Q: Can I export report data?**
A: Currently, report data is view-only. For raw data exports, use the **API Explorer** page to query invoices with filters and copy the JSON response. CSV export is on the roadmap.

**Q: Why does the Reports page show different numbers than the Invoice table?**
A: The Reports page aggregates across all invoices. If you're using filters on the Invoice page, you may see a subset. The Reports page always shows the full picture.

**Q: Can I customize which metrics appear?**
A: Not currently. The four metric cards are fixed. Custom dashboards are planned for a future release.
