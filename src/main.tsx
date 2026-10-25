import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const container = document.getElementById('root')
// getElementById は HTMLElement | null を返す。`!` で黙らせず、null のときは明示的にエラーにする。
// （index.html に #root がある限り起きないが、型の上では null を処理しない限り先へ進めない）
if (!container) {
  throw new Error('#root 要素が見つかりません。index.html を確認してください。')
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
