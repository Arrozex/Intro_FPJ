'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import ResultContent to disable SSR
const ResultContent = dynamic(() => import('./ResultContent'), { ssr: false })

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-600">載入中...</div>}>
      <ResultContent />
    </Suspense>
  )
}
