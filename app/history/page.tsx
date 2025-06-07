'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 模擬的歷史數據
const mockHistoryData = {
  '2025-06-01': { mood: '快樂', emoji: '😊', diary: '今天天氣很好，心情也很棒！', image: 'https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', music: 'https://example.com/music.mp3'},
  '2025-06-03': { mood: '平靜', emoji: '😌', diary: '讀了一本好書，感覺很平靜。' , image: 'https://images.pexels.com/photos/96627/pexels-photo-96627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', music: 'https://example.com/music.mp3'},
  '2025-06-05': { mood: '焦慮', emoji: '😰', diary: '工作壓力有點大...' , image: 'https://images.pexels.com/photos/4220967/pexels-photo-4220967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', music: 'https://example.com/music.mp3'},
  '2025-06-07': { mood: '快樂', emoji: '😢', diary: '作業要做不完了...' , image: 'https://images.pexels.com/photos/1743165/pexels-photo-1743165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', music: 'https://example.com/music.mp3'},
  '2025-05-12': { mood: '悲傷', emoji: '😢', diary: '今天有點低落，不知道為什麼。' , image: 'https://images.pexels.com/photos/1743165/pexels-photo-1743165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', music: 'https://example.com/music.mp3'},
  '2025-05-15': { mood: '憤怒', emoji: '😡', diary: '遇到一些令人生氣的事情。' , image: 'https://images.pexels.com/photos/68645/hawaii-volcano-hot-fire-68645.jpeg?auto=compress&cs=tinysrgb&w=600', music: 'https://example.com/music.mp3'},
  '2025-05-18': { mood: '快樂', emoji: '😊', diary: '完成了一個重要的項目！' , image: 'https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', music: 'https://example.com/music.mp3'},
  '2025-05-20': { mood: '平靜', emoji: '😌', diary: '冥想了一小時，內心很平靜。' , image: 'https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', music: 'https://example.com/music.mp3'},
}

const displayedMonth = `${year}-${String(month + 1).padStart(2, '0')}`
const currentMonthData = Object.entries(mockHistoryData).filter(
  ([date, _]) => date.startsWith(displayedMonth)
)


interface HistoryEntry {
  mood: string
  emoji: string
  diary: string
}

export default function HistoryPage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')

  // 獲取當月的天數和第一天是星期幾
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const todayStr = new Date().toISOString().slice(0, 10)  // YYYY-MM-DD 格式


  // 月份名稱
  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ]

  // 星期名稱
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']

  // 生成日曆格子
  const calendarDays = []
  
  // 空白格子（月初前的空格）
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  
  // 當月的日期
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  // 格式化日期為 YYYY-MM-DD
  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  // 處理日期點擊
  const handleDateClick = (day: number) => {
    const dateKey = formatDate(day)
    const entry = mockHistoryData[dateKey as keyof typeof mockHistoryData]
    if (entry) {
      setSelectedEntry(entry)
      setSelectedDate(dateKey)
    }
  }

  // 切換月份
  const changeMonth = (direction: number) => {
    setCurrentDate(new Date(year, month + direction, 1))
    setSelectedEntry(null)
    setSelectedDate('')
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: 'linear-gradient(135deg, #FFED97 0%, #f2af4b 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* 標題和返回按鈕 */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.push('/')}
            className="bg-[#d18f4b] hover:bg-[#bd7b39] text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-lg"
          >
            ← 返回主頁
          </button>
          <h2 className="text-3xl font-extrabold text-[#BB5E00]">
            心情記錄
          </h2>
          <div className="w-24"></div> {/* 佔位符，保持標題居中 */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 日曆部分 */}
          <div className="lg:col-span-2">
            <div className="bg-[#fceeac] rounded-3xl shadow-xl p-8">
              {/* 月份導航 */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => changeMonth(-1)}
                  className="w-10 h-10 rounded-full bg-[#d18f4b] hover:bg-[#bd7b39] text-white flex items-center justify-center transition-colors duration-200"
                >
                  ←
                </button>
                <h2 className="text-2xl font-bold text-[#BB5E00]">
                  {year}年 {monthNames[month]}
                </h2>
                <button
                  onClick={() => changeMonth(1)}
                  className="w-10 h-10 rounded-full bg-[#d18f4b] hover:bg-[#bd7b39] text-white flex items-center justify-center transition-colors duration-200"
                >
                  →
                </button>
              </div>

              {/* 星期標題 */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekdays.map(day => (
                  <div key={day} className="text-center font-semibold text-[#BB5E00] py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* 日曆格子 */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="h-12"></div>
                  }

                  const dateKey = formatDate(day)
                  const hasEntry = mockHistoryData[dateKey as keyof typeof mockHistoryData]
                  const isSelected = selectedDate === dateKey
                  const isToday = dateKey === todayStr

                  return (
                    <button
                      key={`day-${day}`}
                      onClick={() => handleDateClick(day)}
                      className={`h-12 rounded-lg transition-all duration-200 flex items-center justify-center relative ${
                        hasEntry
                          ? isSelected
                            ? 'bg-[#BB5E00] text-white shadow-lg scale-105'
                            : 'bg-white hover:bg-[#f7f7f7] shadow-md hover:shadow-lg hover:scale-105'
                          : 'text-[#888] hover:bg-white/50'
                      }
                        ${isToday ? 'ring-2 ring-[#f29f05] ring-offset-1' : ''}`}
                    >
                      <span className="text-sm font-medium">{day}</span>
                      {hasEntry && (
                        <span className="absolute -top-1 -right-1 text-xs">
                          {hasEntry.emoji}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 詳情面板 */}
          <div className="lg:col-span-1">
            <div className="bg-[#fceeac] rounded-3xl shadow-xl p-8 sticky top-6">
              {selectedEntry ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{selectedEntry.emoji}</div>
                      <h3 className="text-xl font-bold text-[#BB5E00]">
                        {selectedEntry.mood}
                      </h3>
                      <p className="text-sm text-[#888] mt-1">{selectedDate}</p>
                    </div>

                    <div className="border-t border-[#d18f4b]/20 pt-6 space-y-4">
                      <h4 className="font-semibold text-[#BB5E00]">日記內容</h4>
                      <div className="bg-white/60 rounded-lg p-4 text-[#3d2e00] leading-relaxed">
                        {selectedEntry.diary}
                    </div>

                    {/* 顯示圖片按鈕 */}
                    {selectedEntry.image && (
                      <button
                        onClick={() => window.open(selectedEntry.image, '_blank')}
                        className="bg-white text-[#BB5E00] text-sm font-medium px-3 py-1 rounded-full border border-[#BB5E00] hover:bg-[#fde49b] transition"
                      >
                        🖼️ 查看圖片
                      </button>
                      )}

                    {/* 播放音樂按鈕 */}
                    {selectedEntry.music && (
                      <button
                        onClick={() => window.open(selectedEntry.music, '_blank')}
                        className="bg-white text-[#BB5E00] text-sm font-medium px-3 py-1 rounded-full border border-[#BB5E00] hover:bg-[#fde49b] transition"
                      >
                        🎵 播放音樂
                      </button>
                    )}
                </div>
              </div>
            ) : (
                <div className="text-center text-[#888] py-12">
                  <div className="text-4xl mb-4">📝</div>
                  <p>點擊日曆上有記錄的日期</p>
                  <p className="text-sm mt-2">查看當天的心情和日記</p>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* 統計信息 */}
        <div className="mt-8 bg-[#fceeac] rounded-3xl shadow-xl p-8">
          <h3 className="text-xl font-bold text-[#BB5E00] mb-6">本月心情統計</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['快樂', '悲傷', '焦慮', '平靜', '憤怒'].map(mood => {
              const count = currentMonthData.filter(([, entry]) => entry.mood === mood).length
              const emoji = { '快樂': '😊', '悲傷': '😢', '焦慮': '😰', '平靜': '😌', '憤怒': '😡' }[mood]
              
              return (
                <div key={mood} className="bg-white/60 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">{emoji}</div>
                  <div className="text-sm text-[#888]">{count} 天</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
