'use client'
import { useState } from 'react'

export default function ApiTestPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [rawResponse, setRawResponse] = useState('')

  const testApi = async () => {
    setLoading(true)
    setResult(null)
    setError('')
    setRawResponse('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mood: '快樂', 
          diary: '今天是美好的一天，陽光明媚，心情很好！' 
        }),
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))

      const contentType = response.headers.get('content-type')
      const responseText = await response.text()
      
      setRawResponse(`
狀態碼: ${response.status}
Content-Type: ${contentType}
回應內容:
${responseText}
      `.trim())

      if (response.ok) {
        try {
          const jsonData = JSON.parse(responseText)
          setResult(jsonData)
        } catch (jsonError) {
          setError(`成功連接但返回格式錯誤: ${jsonError}`)
        }
      } else {
        setError(`API返回錯誤狀態: ${response.status}`)
      }
    } catch (fetchError: any) {
      setError(`網路錯誤: ${fetchError.message}`)
      setRawResponse(`網路錯誤: ${fetchError.message}`)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">API 連接測試工具</h1>
          
          <div className="mb-6">
            <button
              onClick={testApi}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? '測試中...' : '測試 API 連接'}
            </button>
          </div>

          {loading && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin mr-3"></div>
                <span className="text-yellow-800">正在測試 API 連接...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">❌ 錯誤信息</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {result && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✅ 成功連接</h3>
              <pre className="text-sm text-green-700 overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          {rawResponse && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">📋 原始回應</h3>
              <pre className="text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap">
                {rawResponse}
              </pre>
            </div>
          )}

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-800 mb-4">🔧 故障排除指南</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="p-3 bg-blue-50 rounded-lg">
                <strong>如果看到 "Unexpected token" 錯誤：</strong>
                <br />
                表示你的 API 返回的不是 JSON 格式，可能是 HTML 錯誤頁面或純文本。
                檢查你的 Next.js API 路由是否正確設置。
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg">
                <strong>如果看到 404 錯誤：</strong>
                <br />
                確保你的 API 路由文件位於 <code>app/api/generate/route.ts</code> 或 <code>pages/api/generate.ts</code>
              </div>
              
              <div className="p-3 bg-red-50 rounded-lg">
                <strong>如果看到 500 錯誤：</strong>
                <br />
                檢查你的後端 API (https://yitxx-prompt-gene.hf.space/generate) 是否正常運行。
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <strong>如果連接成功但返回格式錯誤：</strong>
                <br />
                檢查你的後端 API 是否返回了 prompt_pic, image_url 等預期的欄位。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
