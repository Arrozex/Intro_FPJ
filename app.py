import gradio as gr
from openai import OpenAI
import os

# ====== 設定 Groq API ======
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

# ====== 處理函數 ======
def emotion_for_pics(mood, diary):
    system_prompt = "你是一個情感生成詞建議機器人，根據用戶心情與日記，生成一個適合作為圖像生成的建議詞。"
    user_prompt = f"""心情：{mood}\n日記：{diary}\n請根據心情與日記，生成適合做為一張圖片生成的建議詞，如：A melancholic rainy cityscape at dusk. A lonely person stands by the window, looking out with a distant gaze. The color palette is gray and blue, soft lighting, with raindrops on the glass. The atmosphere feels quiet, introspective, and emotionally heavy, evoking sadness and solitude.
。不需要解釋或評論，只需給出建議詞。"""

    response = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.9
    )

    return response.choices[0].message.content

def emotion_for_music(mood, diary):
    system_prompt = "你是一個情感生成詞建議機器人，根據用戶心情與日記，生成一個適合作為音樂生成的建議詞。"
    user_prompt = f"""心情：{mood}\n日記：{diary}\n請根據心情與日記，生成適合共同生成一首歌的建議詞，如：A slow, emotional sad song with a melancholy piano as the main instrument, accompanied by soft strings in the background. The mood should be reflective and sorrowful, evoking feelings of heartbreak, loneliness, or nostalgia. Tempo should be slow and expressive, like a rainy afternoon where everything feels still and quiet.
，不需要解釋或評論，只需給出建議詞。"""

    response = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.9
    )

    return response.choices[0].message.content

# ====== Gradio UI ======
with gr.Blocks() as demo:
    gr.Markdown("## 🎵 心情日記生成器")

    mood = gr.Radio(["快樂", "悲傷", "焦慮", "平靜", "憤怒"], label="你今天的心情是？")
    diary = gr.Textbox(lines=5, placeholder="寫下今天的心情...", label="日記內容")

    submit = gr.Button("分析並生成 prompt")
    output_pic = gr.Textbox(label="圖片提示")
    output_music = gr.Textbox(label="音樂提示")

    submit.click(fn=emotion_for_pics, inputs=[mood, diary], outputs=output_pic)
    submit.click(fn=emotion_for_music, inputs=[mood, diary], outputs=output_music)


demo.launch(share=True, debug=True)
