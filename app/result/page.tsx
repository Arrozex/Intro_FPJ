'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ResultContent from './ResultContent'

export default function ResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [promptPic, setPromptPic] = useState<string | null>(null)
  const [promptMusic, setPromptMusic] = useState<string | null>(null)
  const [musicUrl, setMusicUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // 從 URL 參數中獲取資料
  useEffect(() => {
    const img = searchParams.get('img')
    const music = searchParams.get('music')
    const prompt = searchParams.get('prompt')
    const musicPrompt = searchParams.get('music_prompt')

    setImageUrl(img ? decodeURIComponent(img) : null)
    setMusicUrl(music ? decodeURIComponent(music) : null)
    setPromptPic(prompt ? decodeURIComponent(prompt) : null)
    setPromptMusic(musicPrompt ? decodeURIComponent(musicPrompt) : null)
    setLoading(false)
  }, [searchParams])

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, #FFED97 0%, #f2af4b 100%)',
      }}
    >
      <div className="bg-[#fceeac] rounded-3xl shadow-xl max-w-3xl w-full p-12 space-y-10 flex flex-col items-center relative">
        {/* 歷史記錄按鈕 */}
        <button
          type="button"
          onClick={() => router.push('/history')}
          className="absolute top-6 right-6 bg-[#d18f4b] hover:bg-[#bd7b39] text-white px-4 py-2 rounded-xl font-semibold transition-colors duration-200 shadow-lg"
        >
          📅 歷史記錄
        </button>

        <h1 className="text-4xl font-extrabold text-[#BB5E00] select-none mb-8">
          🎨 你的心情創作
        </h1>

        <ResultContent
          imageUrl={imageUrl}
          promptPic={promptPic}
          promptMusic={promptMusic}
          musicUrl={musicUrl}
          loading={loading}
        />

        {/* 返回按鈕 */}
        <button
          onClick={() => router.push('/')}
          className="w-full max-w-xs py-3 rounded-xl text-white font-semibold transition shadow-lg hover:shadow-xl transform hover:scale-105 bg-[#d18f4b] hover:bg-[#bd7b39] focus:outline-none focus:ring-4 focus:ring-[#BB5E00]"
        >
          返回首頁
        </button>
      </div>
    </div>
  )
}
