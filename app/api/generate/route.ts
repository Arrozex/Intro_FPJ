// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { mood, diary } = await req.json();

  // 處理分析與生成邏輯（例如呼叫 OpenAI、生成圖片等）

  return NextResponse.json({
    prompt_pic: "A melancholic rainy city...",
    image_url: "https://...",
    prompt_music: "A slow emotional sad song...",
    status: "✅ 完成"
  });
}
