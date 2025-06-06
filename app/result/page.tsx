import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ResultContent = dynamic(() => import('./ResultContent'), { ssr: false })

export default function Page(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
