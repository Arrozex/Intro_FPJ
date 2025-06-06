'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [mood, setMood] = useState('')
  const [diary, setDiary] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://yitxx-prompt-gene.hf.space', { // 改成你的 API route 路徑
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood, diary }),
      })

      if (!res.ok) {
        const error = await res.json()
        alert('API錯誤：' + error.error)
        setLoading(false)
        return
      }

      const result = await res.json()

      // 組合圖片 base64 URL
      const imageUrl = result.image_base64
        ? `data:image/png;base64,${result.image_base64}`
        : ''

      // 這邊 musicUrl 你要先確定後端怎麼回，如果是 URL 就直接用
      const musicUrl = result.music_url || ''

      // 跳轉到 /result 頁面，帶入參數
      const query = new URLSearchParams({
        img: imageUrl,
        music: musicUrl,
        prompt: result.prompt_pic || '',
        music_prompt: result.prompt_music || '',
      }).toString()

      router.push('/result?' + query)
    } catch (e) {
      alert('伺服器錯誤，請稍後再試')
      setLoading(false)
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="輸入心情"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <textarea
        placeholder="輸入日記"
        value={diary}
        onChange={(e) => setDiary(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? '生成中...' : '生成圖片與音樂'}
      </button>
    </div>
  )
}
