'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold text-center">🎵 心情日記生成器</h1>

        <label className="block">
          <span className="text-gray-700">你今天的心情是？</span>
          <select value={mood} onChange={e => setMood(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded p-2">
            <option>快樂</option>
            <option>悲傷</option>
            <option>焦慮</option>
            <option>平靜</option>
            <option>憤怒</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">日記內容</span>
          <textarea
            value={diary}
            onChange={e => setDiary(e.target.value)}
            rows={5}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            placeholder="寫下今天的心情..."
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? '生成中...' : '分析並生成'}
        </button>
      </form>
    </div>
  )
}
