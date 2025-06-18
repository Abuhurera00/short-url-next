'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import Link from 'next/link'

export default function UrlGenerator() {
    const [url, setUrl] = useState('')
    const [shortId, setShortId] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleGenerate() {
        if (!url) return toast.error('Please provide a URL.')
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/url`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            })
            const data = await res.json()
            if (data.success) setShortId(data.id)
            else toast.error(data.message)
        } catch (err) {
            toast.error('Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>Generate a Short URL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input
                    placeholder="https://example.com/very/long/url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
                <Button onClick={handleGenerate} disabled={loading} className="w-full">
                    {loading ? <Loader className='animate-spin' /> : 'Generate'}
                </Button>
                {shortId && (
                    <div className="space-y-2">
                        <p>Your short URL:</p>
                        <a
                            href={`/${shortId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {window.location.origin}/{shortId}
                        </a>
                        <Button asChild className="mt-2 w-full">
                            <Link href={`/analytics/${shortId}`}>View Analytics</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}