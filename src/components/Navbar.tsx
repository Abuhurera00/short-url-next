'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    return (
        <nav className="bg-white shadow px-4 py-2 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">URL Shortener</Link>
            <div className="space-x-2">
                {loading ? null : session ? (
                    <>
                        <Link href="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
                        <Button variant="destructive" onClick={() => signOut()}>Sign Out</Button>
                    </>
                ) : (
                    <>
                        <Link href="/signup"><Button variant="outline">Sign Up</Button></Link>
                        <Link href="/login"><Button>Sign In</Button></Link>
                    </>
                )}
            </div>
        </nav>
    )
}