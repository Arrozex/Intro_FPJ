'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const moods = [
  { label: '快樂', emoji: '😊' },
  { label: '悲傷', emoji: '😢' },
  { label: '焦慮', emoji: '😰' },
  { label: '平靜', emoji: '😌' },
  { label: '憤怒', emoji: '😡' },
]

export default function HomePage() {
  const router = useRouter()
  const [mood, setMood] = useState('')
  const [diary, setDiary] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood, diary }),
    })

    const data = await res.json()

    if (res.ok) {
      router.push(
        `/result?img=${encodeURIComponent(data.image_url)}&music=${encodeURIComponent(
          data.music_url
        )}&prompt=${encodeURIComponent(data.prompt_pic)}&music_prompt=${encodeURIComponent(data.prompt_music)}`
      )
    } else {
      alert('生成失敗，請稍後再試')
    }

    setLoading(false)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: '#FFED97' }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFED97] border-4 border-[#BB5E00] rounded-3xl shadow-xl max-w-3xl w-full p-12 space-y-10 flex flex-col items-center"
        style={{ minHeight: '600px' }}
      >
        <h1
          className="text-4xl font-extrabold text-[#BB5E00] select-none mb-8"
          style={{ userSelect: 'none' }}
        >
          🎵 你今天心情如何？
        </h1>

        {/* 表情按鈕區 */}
        <div className="flex gap-8 mb-12 justify-center">
          {moods.map(({ label, emoji }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={() => setMood(label)}
              className={`text-5xl transition-transform duration-200 ${
                mood === label ? 'scale-125' : 'scale-100 opacity-60 hover:opacity-100'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* 日記輸入區，點選表情後才顯示，帶淡入上滑動畫 */}
        {mood && (
          <div
            className="w-full max-w-xl flex flex-col gap-6 opacity-0 animate-fadeInUp animation-fill-forwards"
            style={{ animationDuration: '0.6s', animationTimingFunction: 'ease-out' }}
          >
            <label className="block">
              <span className="text-[#BB5E00] font-semibold mb-2 inline-block text-lg">
                日記內容
              </span>
              <textarea
                value={diary}
                onChange={e => setDiary(e.target.value)}
                rows={6}
                placeholder="寫下今天的心情..."
                required
                className="w-full rounded-lg border-2 border-[#BB5E00] px-4 py-3 text-[#3d2e00] resize-none placeholder-[#b3982c] focus:outline-none focus:ring-4 focus:ring-[#BB5E00] transition"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-semibold
                bg-[#BB5E00] hover:bg-[#a04e00] focus:outline-none focus:ring-4 focus:ring-[#BB5E00] transition disabled:opacity-50 disabled:cursor-not-allowed text-lg`}
            >
              {loading ? '生成中...' : '分析並生成'}
            </button>
          </div>
        )}
      </form>

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation-name: fadeInUp;
        }
      `}</style>
    </div>
  )
}
