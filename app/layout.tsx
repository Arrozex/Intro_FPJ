import './globals.css'

export const metadata = {
  title: '心情日記 App',
  description: '用圖像與音樂記錄情緒',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
