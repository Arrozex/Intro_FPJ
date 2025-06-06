'use client'
import Image from 'next/image'

interface ResultContentProps {
  imageUrl: string | null
  promptPic: string | null
  promptMusic: string | null
  musicUrl: string | null
  loading: boolean
}

export default function ResultContent({
  imageUrl,
  promptPic,
  promptMusic,
  musicUrl,
  loading,
}: ResultContentProps) {
  return (
    <div className="w-full space-y-8">
      {loading ? (
        <div className="w-full flex justify-center">
          <div className="w-12 h-12 border-4 border-[#d18f4b] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* 圖片顯示區 */}
          {imageUrl ? (
            <div className="w-full flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-[#BB5E00] mb-4">生成圖片</h2>
              <div className="relative w-full max-w-md h-64 bg-white/90 rounded-lg shadow-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="Generated Mood Image"
                  fill
                  className="object-cover"
                  onError={() => {}}
                />
              </div>
              {promptPic && (
                <p className="text-[#BB5E00] mt-4 text-sm max-w-md break-words text-center">
                  <span className="font-semibold">圖片提示詞:</span> {promptPic}
                </p>
              )}
            </div>
          ) : (
            <p className="text-[#BB5E00] text-center">圖片生成失敗，請稍後重試</p>
          )}

          {/* 音樂提示詞顯示區 */}
          {promptMusic && (
            <div className="w-full flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-[#BB5E00] mb-4">音樂風格</h2>
              <p className="text-[#BB5E00] text-sm max-w-md break-words text-center">
                <span className="font-semibold">音樂提示詞:</span> {promptMusic}
              </p>
              {musicUrl ? (
                <audio
                  controls
                  className="mt-4 w-full max-w-md"
                  src={musicUrl}
                  onError={() => {}}
                >
                  你的瀏覽器不支援音頻播放
                </audio>
              ) : (
                <p className="text-[#BB5E00] text-sm mt-4">音樂生成尚未支援</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
