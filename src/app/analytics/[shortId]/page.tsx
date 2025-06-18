import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AnalyticsPageProps {
  params: { shortId: string }
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  const { shortId } = params
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/url/analytics/${shortId}`, { cache: 'no-store' })
  const data = await res.json()

  if (!data.success) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{data.message}</p>
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">Analytics for {shortId}</h1>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Total Clicks: {data.totalClicks}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.analytics.map((entry: { timestamp: number }, idx: number) => (
              <li key={idx} className="flex justify-between">
                <span>Click #{idx + 1}</span>
                <span>{new Date(entry.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}