'use client'

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [mood, setMood] = useState("快樂");
  const [diary, setDiary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, diary }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push(
        `/result?img=${encodeURIComponent(data.image_url)}&music=${encodeURIComponent(
          data.music_url
        )}&prompt=${encodeURIComponent(data.prompt_pic)}&music_prompt=${encodeURIComponent(
          data.prompt_music
        )}`
      );
    } else {
      alert("生成失敗，請稍後再試");
    }

    setLoading(false);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-100">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-lg">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full space-y-6"
        >
          <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-4 select-none">
            🎵 心情日記生成器
          </h1>

          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 inline-block">
              你今天的心情是？
            </span>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="mt-1 block w-full rounded-md border border-purple-300 px-3 py-2 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            >
              <option>快樂</option>
              <option>悲傷</option>
              <option>焦慮</option>
              <option>平靜</option>
              <option>憤怒</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 inline-block">
              日記內容
            </span>
            <textarea
              value={diary}
              onChange={(e) => setDiary(e.target.value)}
              rows={5}
              className="mt-1 block w-full rounded-md border border-purple-300 px-3 py-2 text-gray-800
                       resize-none placeholder-purple-300
                       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              placeholder="寫下今天的心情..."
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold
            bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
            hover:from-purple-600 hover:via-pink-600 hover:to-red-600
            focus:outline-none focus:ring-4 focus:ring-purple-300
            transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "生成中..." : "分析並生成"}
          </button>
        </form>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
