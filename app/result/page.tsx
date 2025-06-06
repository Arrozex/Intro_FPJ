// app/result/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ResultContent() {
  const searchParams = useSearchParams()
  const img = searchParams.get('img')
  const music = searchParams.get('music')
  const prompt = searchParams.get('prompt')
  const musicPrompt = searchParams.get('music_prompt')

  return (
    <div className="min-h-screen p-6" style={{
      background: 'linear-gradient(135deg, #FFED97 0%, #f2af4b 100%)',
    }}>
      <div className="max-w-4xl mx-auto">
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
            <audio controls className="w-full">
              <source src={music} type="audio/mpeg" />
            </audio>
          </div>
        )}

        <button
          onClick={() => window.history.back()}
          className="bg-[#d18f4b] hover:bg-[#bd7b39] text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-lg"
        >
          ← 返回
        </button>
      </div>
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
