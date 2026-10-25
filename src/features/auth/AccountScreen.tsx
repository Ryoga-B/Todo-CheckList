import { useState } from 'react'
import { useAuth } from './useAuth'

// ログイン後の仮画面。ホームなど本来の画面ができるまで、ログイン状態の確認とログアウトだけを置く。
export function AccountScreen() {
  const { state, signOut } = useAuth()
  const [pending, setPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // state は判別可能ユニオン型。この if で signedIn だけに絞り込むと、以降は state.user が使える。
  // 絞り込みがないまま state.user を書くと、型エラーになる。
  if (state.status !== 'signedIn') {
    return null
  }

  async function handleSignOut() {
    setPending(true)
    setErrorMessage(null)
    const result = await signOut()
    setErrorMessage(result.errorMessage)
    setPending(false)
  }

  return (
    <main className="screen screen--center">
      <p>ログイン中：{state.user.email}</p>
      <button type="button" className="button" onClick={handleSignOut} disabled={pending}>
        ログアウト
      </button>
      {errorMessage && (
        <p role="alert" className="error">
          {errorMessage}
        </p>
      )}
    </main>
  )
}
