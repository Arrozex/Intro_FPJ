import './globals.css'

export const metadata = {
  title: '心情日記 App',
  description: '用圖像與音樂記錄情緒',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <body className="bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}
