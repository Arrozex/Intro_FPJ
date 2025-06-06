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
  const [mood, setMood] = useState('快樂')
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
      router.push(`/result?img=${encodeURIComponent(data.image_url)}&music=${encodeURIComponent(data.music_url)}&prompt=${encodeURIComponent(data.prompt_pic)}&music_prompt=${encodeURIComponent(data.prompt_music)}`)
    } else {
      alert('生成失敗，請稍後再試')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF4C1] p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-lg w-full space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-[#b38f00] mb-4 select-none">
          🎵 心情日記生成器
        </h1>

        <div>
          <span className="text-[#b38f00] font-semibold mb-2 inline-block">你今天的心情是？</span>
          <div className="flex gap-4 mt-2 justify-center">
            {moods.map(({ label, emoji }) => (
              <button
                type="button"
                key={label}
                onClick={() => setMood(label)}
                aria-label={label}
                className={`text-3xl transition-transform duration-150 ${
                  mood === label ? 'scale-125' : 'scale-100 opacity-70 hover:opacity-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-[#b38f00] font-semibold mb-1 inline-block">日記內容</span>
          <textarea
            value={diary}
            onChange={e => setDiary(e.target.value)}
            rows={5}
            className="mt-1 block w-full rounded-md border border-[#b38f00] px-3 py-2 text-gray-800
                       resize-none placeholder-[#d6b800]
                       focus:outline-none focus:ring-2 focus:ring-[#b38f00] focus:border-transparent transition"
            placeholder="寫下今天的心情..."
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold
            bg-gradient-to-r from-[#b38f00] via-[#d6b800] to-[#f0c419]
            hover:from-[#a07a00] hover:via-[#c1a300] hover:to-[#deb71e]
            focus:outline-none focus:ring-4 focus:ring-[#b38f00]
            transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? '生成中...' : '分析並生成'}
        </button>
      </form>
    </div>
  )
}
