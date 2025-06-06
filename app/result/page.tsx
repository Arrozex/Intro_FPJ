import dynamic from 'next/dynamic'

const ResultContent = dynamic(() => import('./ResultContent'))

export default function Page() {
  return <ResultContent />
}
