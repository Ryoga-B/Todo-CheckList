import { useState } from 'react'
import { Screen } from '../../layout/Screen'
import { useAuth } from '../auth/useAuth'
import styles from './HomeScreen.module.css'

// ホームの仮表示。本来の内容（持参数・TODO・ゴミ出し）は最後の段階で作る。
// それまでは、ログイン状態の確認とログアウトの置き場として使う。
export function HomeScreen() {
  const { state, signOut } = useAuth()
  const [pending, setPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // state は判別可能ユニオン型。この if で signedIn だけに絞り込むと、以降は state.user が使える。
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
    <Screen title="ホーム">
      <div className={styles.account}>
        <p className={styles.email}>ログイン中：{state.user.email}</p>
        <button type="button" className="button" onClick={handleSignOut} disabled={pending}>
          ログアウト
        </button>
        {errorMessage && (
          <p role="alert" className="error">
            {errorMessage}
          </p>
        )}
      </div>
    </Screen>
  )
}
