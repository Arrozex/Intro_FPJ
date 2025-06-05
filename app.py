import gradio as gr
from openai import OpenAI
import os

# ====== 設定 Groq API ======
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

# ====== 處理函數 ======
def analyze_emotion(mood, diary):
    system_prompt = "你是一個情感分析師，根據用戶心情與日記，生成一個圖像描述與音樂風格建議。請使用台灣習慣的中文回答。"
    user_prompt = f"心情：{mood}\n日記：{diary}\n請分別生成圖像描述與音樂風格。請使用台灣習慣的中文回答。"

    response = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.8
    )

    return response.choices[0].message.content

# ====== Gradio UI ======
with gr.Blocks() as demo:
    gr.Markdown("## 🎵 心情日記生成器")

    mood = gr.Radio(["快樂", "悲傷", "焦慮", "平靜"], label="你今天的心情是？")
    diary = gr.Textbox(lines=5, placeholder="寫下今天的心情...", label="日記內容")

    submit = gr.Button("分析並生成 prompt")
    output = gr.Textbox(label="生成的圖片與音樂提示")

    submit.click(fn=analyze_emotion, inputs=[mood, diary], outputs=output)

demo.launch(share=True, debug=True)
