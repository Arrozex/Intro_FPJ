'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

export default function ResultPage() {
  const searchParams = useSearchParams()
  const imageUrl = searchParams.get('img')
  const musicUrl = searchParams.get('music')
  const promptPic = searchParams.get('prompt')
  const promptMusic = searchParams.get('music_prompt')

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-bold text-center">🎉 生成結果</h1>

      <div className="w-full max-w-xl bg-white p-4 rounded shadow space-y-4">
        <div>
          <h2 className="text-xl font-semibold">🎨 圖像描述詞</h2>
          <p className="text-gray-700">{promptPic}</p>
        </div>

        {imageUrl ? (
          <div className="w-full h-auto">
            <Image
              src={imageUrl}
              alt="生成圖片"
              width={800}
              height={600}
              className="rounded"
            />
          </div>
        ) : (
          <p className="text-red-500">⚠️ 圖片載入失敗或尚未生成。</p>
        )}

        <div>
          <h2 className="text-xl font-semibold">🎵 音樂描述詞</h2>
          <p className="text-gray-700">{promptMusic}</p>
        </div>

        {musicUrl ? (
          <audio controls className="w-full mt-2">
            <source src={musicUrl} type="audio/wav" />
            你的瀏覽器不支援 audio 播放。
          </audio>
        ) : (
          <p className="text-red-500">⚠️ 音樂載入失敗或尚未生成。</p>
        )}
      </div>
    </div>
  )
}
