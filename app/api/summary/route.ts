import { fetchCardData, fetchRevenue } from '@/app/lib/data';

export async function GET() {
  try {
    const [cardData, revenue] = await Promise.all([
      fetchCardData(),
      fetchRevenue(),
    ]);

    return Response.json({
      ...cardData,
      revenue,
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch summary data' },
      { status: 500 },
    );
  }
}
