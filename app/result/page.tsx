'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'

function ResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  //const img = searchParams.get('img') 暫時先不要因為額度不夠生不出來
  const img = ""
  const music = searchParams.get('music')
  const prompt = searchParams.get('prompt')
  const musicPrompt = searchParams.get('music_prompt')

  // 背景圖片邏輯
  const backgroundImage = img || '/night-sky-stars.jpg'

  // 用於記錄用戶對生成結果的滿意度回饋
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  // 模擬回饋送出（未來可以改成呼叫 API）
  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type)
    setFeedbackSent(true)
    // TODO: 這裡可以擴展成呼叫 API 傳送回饋數據
    console.log('用戶回饋:', type)
  }

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center relative"
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

      {prompt && (
        <p className="text-center text-[#e3e1de] text-sm italic mb-6">
          圖片提示詞：{prompt}
        </p>
      )}

      {music && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#BB5E00] mb-4">心情音樂</h2>
          <audio controls className="w-full">
            <source src="/music/43412315_MotionElements_christmas-corporate_preview.mp3" type="audio/mpeg" />
            你的瀏覽器不支援 audio 元素。
          </audio>
          {musicPrompt && (
            <p className="text-center text-[#e3e1de] text-sm italic mt-2">
              音樂提示詞：{musicPrompt}
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => window.history.back()}
        className="absolute bottom-8 left-6 bg-[#d18f4b] hover:bg-[#bd7b39] text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-lg"
      >
        ← 返回
      </button>

      {/* 新增：生成回饋按鈕區塊 */}
      <div className="fixed bottom-8 right-6 flex flex-col items-center space-y-2 bg-black bg-opacity-50 p-4 rounded-xl shadow-lg text-white">
        <p className="mb-1 font-semibold">您對生成結果滿意嗎？</p>
        {feedbackSent ? (
          <p className="text-green-400">
            {feedback === 'positive' ? '感謝您的肯定！✔' : '已收到您的回饋✘'}
          </p>
        ) : (
          <div className="flex space-x-4">
            <button
              onClick={() => handleFeedback('positive')}
              aria-label="滿意"
              className="text-2xl hover:text-green-400 transition-colors"
            >
              ✔
            </button>
            <button
              onClick={() => handleFeedback('negative')}
              aria-label="不滿意"
              className="text-2xl hover:text-red-400 transition-colors"
            >
              ✘
            </button>
          </div>
        )}
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
