'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function ResultContent() {
  const searchParams = useSearchParams()
  const imageUrl = searchParams.get('img')
  const musicUrl = searchParams.get('music')
  const promptPic = searchParams.get('prompt')
  const promptMusic = searchParams.get('music_prompt')

  // State for handling loading and error states
  const [imageError, setImageError] = useState(false)
  const [musicError, setMusicError] = useState(false)

  // Validate URLs (basic check for demo purposes)
  useEffect(() => {
    if (imageUrl && !imageUrl.startsWith('http')) {
      setImageError(true)
    }
    if (musicUrl && !musicUrl.startsWith('http')) {
      setMusicError(true)
    }
  }, [imageUrl, musicUrl])

  return (
    <div
      className="min-h-screen p-6 flex flex-col items-center"
      style={{
        background: 'linear-gradient(135deg, #FFED97 0%, #f2af4b 100%)',
      }}
    >
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#BB5E00] text-center">
          🎉 生成結果
        </h1>

        {/* Prompts Section */}
        {(promptPic || promptMusic) && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#BB5E00]">📝 生成提示詞</h2>
            {promptPic && (
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium text-[#BB5E00] mb-2">圖像提示詞</h3>
                <p className="text-gray-700 font-mono whitespace-pre-wrap">{promptPic}</p>
              </div>
            )}
            {promptMusic && (
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium text-[#BB5E00] mb-2">音樂提示詞</h3>
                <p className="text-gray-700 font-mono whitespace-pre-wrap">{promptMusic}</p>
              </div>
            )}
          </div>
        )}

        {/* Image Section */}
        {imageUrl && !imageError ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#BB5E00]">🖼️ 生成的圖片</h2>
            <div className="flex justify-center">
              <Image
                src={imageUrl}
                alt="生成的圖片"
                width={800}
                height={600}
                className="rounded-lg shadow-lg max-w-full h-auto"
                onError={() => setImageError(true)}
                placeholder="blur"
                blurDataURL="/placeholder.png" // Optional: add a placeholder image
              />
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-center">
            ⚠️ 圖片載入失敗或尚未生成。
          </p>
        )}

        {/* Music Section */}
        {musicUrl && !musicError ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#BB5E00]">🎵 生成的音樂</h2>
            <audio
              controls
              className="w-full"
              onError={() => setMusicError(true)}
              aria-label="播放生成的音樂"
            >
              <source src={musicUrl} type="audio/mpeg" />
              你的瀏覽器不支援 audio 播放。
            </audio>
          </div>
        ) : (
          <p className="text-red-500 text-center">
            ⚠️ 音樂載入失敗或尚未生成。
          </p>
        )}

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => window.history.back()}
            className="bg-[#d18f4b] hover:bg-[#bd7b39] text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-lg"
            aria-label="返回上一頁"
          >
            ← 返回
          </button>
        </div>
      </div>
    </div>
  )
}
