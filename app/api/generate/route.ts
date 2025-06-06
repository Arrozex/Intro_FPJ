import gradio as gr
from openai import OpenAI
import os

# ====== 設定 Groq API ======
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

# ========= 主流程 =========
def generate_main(mood, diary):
    try:
        status = "🎯 Step 1：分析心情中..."
        prompt_pic = emotion_for_pics(mood, diary)
        print(status, prompt_pic)

        status = "🎯 Step 2：生成音樂提示..."
        prompt_music = emotion_for_music(mood, diary)
        print(status, prompt_music)

        status = "🖼️ Step 3：生成圖片中..."
        print(status)
        image_url = generate_image(prompt_pic)

        status = "🎵 Step 4：生成音樂中..."
        print(status)
        # audio_url = generate_music_local(prompt_music)

        status = "✅ 完成！"
        return prompt_pic, image_url, prompt_music, status

    except Exception as e:
        return "", None, "", None, f"❌ 發生錯誤：{str(e)}"

# ========= 圖像生成提示詞 =========
def emotion_for_pics(mood, diary):
    system_prompt = "你是一個情感生成詞建議機器人，根據用戶心情與日記，生成一個適合作為圖像生成的建議詞。"
    user_prompt = f"""心情：{mood}\n日記：{diary}\n請根據心情與日記，生成適合做為一張圖片生成的建議詞，如：A melancholic rainy cityscape at dusk. ..."""

    response = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.9
    )

    return response.choices[0].message.content.strip()

# ========= 音樂生成提示詞 =========
def emotion_for_music(mood, diary):
    system_prompt = "你是一個情感生成詞建議機器人，根據用戶心情與日記，生成一個適合作為音樂生成的建議詞。"
    user_prompt = f"""心情：{mood}\n日記：{diary}\n請根據心情與日記，生成適合共同生成一首歌的建議詞，如：A slow, emotional sad song with..."""

    response = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.9
    )

    return response.choices[0].message.content.strip()

# ========= 圖片生成 =========
def generate_image(prompt):
    API_URL = "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-3.5-large"
    headers = {"Authorization": f"Bearer {HUGGING_FACE_API}"}

    response = requests.post(API_URL, headers=headers, json={"inputs": prompt})
    if response.status_code == 200:
        with open("output.png", "wb") as f:
            f.write(response.content)
        return "output.png"
    else:
        print("圖片生成錯誤:", response.status_code, response.text)
        return "圖片生成失敗"

# ========= 音樂生成 =========
def generate_music(prompt):
    headers = {
        "Authorization":  f"Bearer {HUGGING_FACE_API}",
        "Content-Type": "application/json"
    }

    response = requests.post(
        "https://api-inference.huggingface.co/models/facebook/musicgen-small",
        headers=headers,
        json={"inputs": prompt}
    )

    if response.status_code == 200:
        with open("generated_music.wav", "wb") as f:
            f.write(response.content)
        return "generated_music.wav"
    else:
        print("錯誤：", response.status_code, response.text)
        return None

# ========= Gradio UI =========
with gr.Blocks() as demo:
    gr.Markdown("## 🎵 心情日記生成器")

    mood = gr.Radio(["快樂", "悲傷", "焦慮", "平靜", "憤怒"], label="你今天的心情是？")
    diary = gr.Textbox(lines=5, placeholder="寫下今天的心情...", label="日記內容")
    submit = gr.Button("分析並生成 prompt")

    output_pic_prompt = gr.Textbox(label="🎨 圖片描述詞")
    output_pic = gr.Image(label="生成圖片")
    output_music_prompt = gr.Textbox(label="🎵 音樂描述詞")
    # output_music = gr.Audio(label="生成音樂", type="filepath")
    output_status = gr.Textbox(label="📝 生成狀態")  

    submit.click(
        fn=generate_main,
        inputs=[mood, diary],
        outputs=[output_pic_prompt, output_pic, output_music_prompt, output_status]
    )

demo.launch(share=True, debug=True)
