import { useState } from 'react'
import { useAuth } from './useAuth'

export function LoginScreen() {
  const { signInWithGoogle } = useAuth()
  const [pending, setPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleClick() {
    // 処理中はボタンを無効にして、二重タップを防ぐ
    setPending(true)
    setErrorMessage(null)
    const result = await signInWithGoogle()
    // 成功時はGoogleの画面へ移動するので、ここに来るのは失敗したとき
    setErrorMessage(result.errorMessage)
    setPending(false)
  }

  return (
    <main className="screen screen--center">
      <button type="button" className="button" onClick={handleClick} disabled={pending}>
        Googleでログイン
      </button>
      {errorMessage && (
        <p role="alert" className="error">
          {errorMessage}
        </p>
      )}
    </main>
  )
}
