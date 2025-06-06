import { Suspense } from 'react'
import ResultContent from './ResultContent'

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">載入中...</div>}>
      <ResultContent />
    </Suspense>
  )
}
