import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { mood, diary } = await req.json()

    const prompt = `
你是一個擅長創作提示詞的 AI 助手。根據使用者的心情與日記，請分別生成：

1. 一個給 AI 圖片生成模型（如 Stable Diffusion 或 DALL·E）使用的圖像提示詞（英文）。
2. 一個可以描述背景音樂風格或情緒的簡短提示（英文）。

請用以下 JSON 格式輸出：
{
  "prompt_pic": "...",
  "prompt_music": "..."
}

心情：${mood}
日記：${diary}
`

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4', // 或使用 'gpt-3.5-turbo'
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
      }),
    })

    if (!openaiRes.ok) {
      const errText = await openaiRes.text()
      return NextResponse.json(
        { error: 'OpenAI 回傳失敗', detail: errText },
        { status: openaiRes.status }
      )
    }

    const data = await openaiRes.json()

    let content = data.choices[0]?.message?.content?.trim()

    // 嘗試解析 JSON 格式的回覆
    let parsed = {}
    try {
      parsed = JSON.parse(content)
    } catch (e) {
      return NextResponse.json(
        { error: 'OpenAI 回傳內容無法解析成 JSON', raw: content },
        { status: 502 }
      )
    }

    return NextResponse.json({
      prompt_pic: parsed['prompt_pic'],
      prompt_music: parsed['prompt_music'],
      image_url: null, // 留空，讓前端下一步去生成
      status: 'ok',
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: '伺服器處理失敗', detail: error.message },
      { status: 500 }
    )
  }
}
