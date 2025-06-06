'use client'
import { useState, useEffect } from 'react'
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
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error' | 'idle'>('idle')
  const [apiError, setApiError] = useState('')

  // 檢測API連接狀態
  const checkApiConnection = async () => {
    setApiStatus('checking')
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mood: '測試', 
          diary: '這是一個API連接測試' 
        }),
      })
      
      const contentType = response.headers.get('content-type')
      let errorMessage = ''
      
      if (response.ok) {
        // 嘗試解析JSON來確認API格式正確
        try {
          const data = await response.json()
          if (data.prompt_pic || data.image_url || data.status) {
            setApiStatus('connected')
            setApiError('')
            return
          } else {
            setApiStatus('error')
            setApiError('API返回格式不正確')
            return
          }
        } catch (jsonError) {
          setApiStatus('error')
          setApiError('API返回非JSON格式')
          return
        }
      } else {
        // 處理錯誤響應
        try {
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json()
            errorMessage = errorData.error || errorData.detail || `HTTP ${response.status}`
          } else {
            // 如果不是JSON，讀取文本內容
            const errorText = await response.text()
            errorMessage = `HTTP ${response.status}: ${errorText.substring(0, 100)}...`
          }
        } catch (parseError) {
          errorMessage = `HTTP ${response.status}: 無法解析錯誤訊息`
        }
        
        setApiStatus('error')
        setApiError(errorMessage)
      }
    } catch (error: any) {
      setApiStatus('error')
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setApiError('無法連接到伺服器')
      } else {
        setApiError(error.message || '網路連接失敗')
      }
    }
  }

  // 頁面載入時自動檢測
  useEffect(() => {
    checkApiConnection()
  }, [])

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
      style={{
        background:
          'linear-gradient(135deg, #FFED97 0%, #f2af4b 100%)',
      }}
    >
      {/* API 狀態欄 */}
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-center">
        <div className={`px-6 py-3 rounded-xl shadow-lg font-semibold text-sm flex items-center gap-3 transition-all duration-500 ${
          apiStatus === 'checking' 
            ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' 
            : apiStatus === 'connected'
            ? 'bg-green-100 text-green-800 border-2 border-green-300'
            : apiStatus === 'error'
            ? 'bg-red-100 text-red-800 border-2 border-red-300'
            : 'hidden'
        }`}>
          {apiStatus === 'checking' && (
            <>
              <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
              檢測 API 連接中...
            </>
          )}
          {apiStatus === 'connected' && (
            <>
              <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              API 連接正常 ✅
            </>
          )}
          {apiStatus === 'error' && (
            <>
              <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                <div className="w-1 h-3 bg-white rounded-full"></div>
              </div>
              API 連接失敗: {apiError}
              <button
                onClick={checkApiConnection}
                className="ml-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                重試
              </button>
            </>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-[#fceeac] rounded-3xl shadow-xl max-w-3xl w-full p-12 space-y-10 flex flex-col items-center relative"
        style={{ minHeight: 600 }}
      >
        {/* 歷史記錄按鈕 */}
        <button
          type="button"
          onClick={() => router.push('/history')}
          className="absolute top-6 right-6 bg-[#d18f4b] hover:bg-[#bd7b39] text-white px-4 py-2 rounded-xl font-semibold transition-colors duration-200 shadow-lg"
        >
          📅 歷史記錄
        </button>

        <h1
          className="text-4xl font-extrabold text-[#BB5E00] select-none mb-8"
          style={{ userSelect: 'none' }}
        >
          🎵 你今天心情如何？
        </h1>

        <div className="flex gap-6 mb-12 justify-center flex-wrap">
          {moods.map(({ label, emoji }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={() => setMood(label)}
              className={`relative w-20 h-20 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#BB5E00] ${
                mood === label 
                  ? 'bg-[#d18f4b] shadow-xl scale-110 ring-4 ring-[#BB5E00]' 
                  : 'bg-white/80 shadow-lg hover:bg-white hover:shadow-xl'
              }`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
              <span className={`text-3xl transition-transform duration-200 ${
                mood === label ? 'scale-110' : 'scale-100'
              }`}>
                {emoji}
              </span>
              <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-[#BB5E00] transition-opacity duration-200 ${
                mood === label ? 'opacity-100' : 'opacity-60'
              }`}>
                {label}
              </div>
            </button>
          ))}
        </div>

        {/* 文字框用 transition 控制顯示/隱藏及位移 */}
        <div
          className={`w-full max-w-xl flex flex-col gap-6 transition-all duration-700 ease-out ${
            mood ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
          }`}
        >
          <label className="block">
            <span className="text-[#BB5E00] font-semibold mb-2 inline-block text-lg">
              日記內容
            </span>
            <textarea
              value={diary}
              onChange={e => setDiary(e.target.value)}
              rows={8}
              placeholder="寫下今天的心情..."
              required={!!mood}
              className="w-full rounded-lg border-0 px-4 py-3 text-[#3d2e00] resize-none placeholder-[#b3982c] focus:outline-none focus:ring-4 focus:ring-[#d18f4b] transition shadow-inner bg-white/90"
            />
          </label>
          <button
            type="submit"
            disabled={loading || !mood || apiStatus !== 'connected'}
            className={`w-full py-3 rounded-xl text-white font-semibold transition shadow-lg hover:shadow-xl transform hover:scale-105 ${
              apiStatus !== 'connected' 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#d18f4b] hover:bg-[#bd7b39] focus:outline-none focus:ring-4 focus:ring-[#BB5E00] disabled:opacity-50 disabled:cursor-not-allowed'
            } text-lg`}
          >
            {loading ? '生成中...' : apiStatus !== 'connected' ? 'API 未連接' : '分析並生成'}
          </button>
        </div>
      </form>
    </div>
  )
}
