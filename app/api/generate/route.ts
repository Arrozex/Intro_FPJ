import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { mood, diary } = await req.json()

    const apiURL = "https://yitxx-prompt-pics.hf.space/api/generate" // 換成你自己的 API 網址

    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood, diary }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: '遠端 API 回傳失敗', detail: errorText },
        { status: response.status }
      )
    }

    const result = await response.json()

    return NextResponse.json({
      prompt_pic: result.prompt_pic,
      image_url: result.image_url,
      prompt_music: result.prompt_music,
      status: result.status,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: '伺服器處理失敗', detail: error.message },
      { status: 500 }
    )
  }
}
