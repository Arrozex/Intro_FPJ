"use client";
import { useState } from "react";

export default function Home() {
  const [mood, setMood] = useState("");
  const [diary, setDiary] = useState("");
  const [result, setResult] = useState<any>(null);

  async function handleSubmit() {
    const res = await fetch("https://yitxx-prompt-generate.hf.space", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, diary }),
    });
    const data = await res.json();
    setResult(data);
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">🎵 心情日記 App</h1>
      <label>你的心情</label>
      <input value={mood} onChange={e => setMood(e.target.value)} className="border p-2 mb-4 block" />
      <label>日記內容</label>
      <textarea value={diary} onChange={e => setDiary(e.target.value)} className="border p-2 mb-4 block" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2">產生</button>

      {result && (
        <div className="mt-4"
