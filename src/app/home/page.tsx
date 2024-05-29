import Link from 'next/link'
import React from 'react'

export default function HomePage() {
  return (
    <div className='px-8 py-2'>
        <div>Welcome to Rancholabs CRM</div>
        <Link href="/home/sales-person">View Leads</Link>
    </div>
  )
}
