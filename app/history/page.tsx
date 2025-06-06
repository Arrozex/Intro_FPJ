// app/history/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

// 模擬的歷史數據
const mockHistoryData = {
  '2024-12-01': { mood: '快樂', emoji: '😊', diary: '今天天氣很好，心情也很棒！' },
  '2024-12-03': { mood: '平靜', emoji: '😌', diary: '讀了一本好書，感覺很平靜。' },
  '2024-12-05': { mood: '焦慮', emoji: '😰', diary: '工作壓力有點大...' },
  '2024-12-08': { mood: '快樂', emoji: '😊', diary: '和朋友聚餐，非常開心！' },
  '2024-12-12': { mood: '悲傷', emoji: '😢', diary: '今天有點低落，不知道為什麼。' },
  '2024-12-15': { mood: '憤怒', emoji: '😡', diary: '遇到一些令人生氣的事情。' },
  '2024-12-18': { mood: '快樂', emoji: '😊', diary: '完成了一個重要的項目！' },
  '2024-12-20': { mood: '平靜', emoji: '😌', diary: '冥想了一小時，內心很平靜。' },
}


export default function HistoryPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffbe6] p-6">
      <h1 className="text-3xl font-bold text-[#BB5E00]">這裡是歷史紀錄頁面 📅</h1>
    </div>
  )
}
