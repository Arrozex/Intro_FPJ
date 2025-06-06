// app/result/page.tsx
'use client'
Add commentMore actions
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function ResultPage() {
function ResultContent() {
  const searchParams = useSearchParams()
  const img = searchParams.get('img')
  const music = searchParams.get('music')
 export default function ResultPage() {
        <h1 className="text-3xl font-bold text-[#BB5E00] mb-8 text-center">
          🎵 生成結果
        </h1>
        

        {img && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#BB5E00] mb-4">生成的圖片</h2>
            <img src={img} alt="Generated" className="w-full max-w-md mx-auto rounded-lg shadow-lg" />
          </div>
        )}
        

        {music && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#BB5E00] mb-4">生成的音樂</h2>
 export default function ResultPage() {
            </audio>
          </div>
        )}
        

        <button
          onClick={() => window.history.back()}
          className="bg-[#d18f4b] hover:bg-[#bd7b39] text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-lg"
           export default function ResultPage() {
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
