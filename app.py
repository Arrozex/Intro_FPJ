import gradio as gr
import openai  # 使用 openai 套件但連到 Groq
import os

# ====== 設定 Groq API 相關參數 ======
openai.api_key = os.getenv("GROQ_API_KEY")
openai.base_url = "https://api.groq.com/openai/v1"

model = "llama3-70b-8192"  # Groq 支援的 LLaMA3 模型名稱

# 處理函數
def analyze_emotion(mood, diary):
    system_prompt = "你是一個情感分析師，根據用戶心情與日記，生成一個圖像描述與音樂風格建議。"
    user_prompt = f"心情：{mood}\n日記：{diary}\n請分別生成圖像描述與音樂風格。"

    response = openai.ChatCompletion.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.8
    )

    return response.choices[0].message.content


# Gradio UI
with gr.Blocks() as demo:
    gr.Markdown("## 🎵 心情日記生成器")

    mood = gr.Radio(["快樂", "悲傷", "焦慮", "平靜"], label="你今天的心情是？")
    diary = gr.Textbox(lines=5, placeholder="寫下今天的心情...", label="日記內容")

    submit = gr.Button("分析並生成 prompt")

    output = gr.Textbox(label="生成的圖片與音樂提示")

    submit.click(fn=analyze_emotion, inputs=[mood, diary], outputs=output)

demo.launch()
