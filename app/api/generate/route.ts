// app/api/generate/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { mood, diary } = await req.json()

    const response = await fetch('https://yitxx-prompt-generate.hf.space/api/predict/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [mood, diary],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: '遠端 API 失敗', detail: errorText }, { status: 500 })
    }

    const result = await response.json()

    // 根據你 HF Space 的格式調整：
    const [prompt_pic, image_url, prompt_music, status] = result.data
    const music_url = "https://your-music-url" // 如果還沒返回音樂網址，可以放固定值或空值

    return NextResponse.json({
      prompt_pic,
      image_url,
      prompt_music,
      music_url,
      status,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: '處理失敗', detail: error.message },
      { status: 500 }
    )
  }
}
