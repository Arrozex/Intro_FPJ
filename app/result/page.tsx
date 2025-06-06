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

  // 背景圖片邏輯
  const backgroundImage = img || '/night-sky-stars.jpg'

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* 歷史記錄按鈕 */}
      <button
        type="button"
        onClick={() => router.push('/history')}
        className="absolute top-6 right-6 bg-[#d18f4b] hover:bg-[#bd7b39] text-white px-4 py-2 rounded-xl font-semibold transition-colors duration-200 shadow-lg"
      >
        查看歷史紀錄
      </button>
      
      <div className="backdrop-blur-sm bg-white/70 rounded-xl p-6 max-w-4xl mx-auto shadow-xl">
        <h1 className="text-3xl font-bold text-[#BB5E00] mb-8 text-center">
          🎵 生成結果
        </h1>

        {prompt && (
          <p className="text-center text-[#7a3e00] text-sm italic mb-6">
            圖片提示詞：{prompt}
          </p>
        )}

        {music && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#BB5E00] mb-4">生成的音樂</h2>
            <audio controls className="w-full">
              <source src={music} type="audio/mpeg" />
            </audio>
            {musicPrompt && (
              <p className="text-center text-[#7a3e00] text-sm italic mt-2">
                音樂提示詞：{musicPrompt}
              </p>
            )}
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
