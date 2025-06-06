import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// 動態載入 client component
const ResultContent = dynamic(() => import('./ResultContent'), { ssr: false })

export default function Page(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
