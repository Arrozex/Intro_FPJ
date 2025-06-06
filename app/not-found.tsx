// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>頁面未找到</h2>
      <p>抱歉，我們找不到您要的頁面。</p>
      <Link href="/">返回首頁</Link>
    </div>
  );
}
