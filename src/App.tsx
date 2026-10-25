import { AuthProvider } from './features/auth/AuthProvider'
import { LoginScreen } from './features/auth/LoginScreen'
import { useAuth } from './features/auth/useAuth'
import { AppShell } from './layout/AppShell'
import styles from './App.module.css'

// ログイン状態に応じて表示する画面を切り替える。
// 未ログイン時はログイン画面だけを表示する（要件2.3）。
function Screens() {
  const { state } = useAuth()

  // switch で status を判定すると、全ケースを網羅していない場合に
  // 「戻り値がない経路がある」という型エラーで気づける
  switch (state.status) {
    case 'loading':
      return <main className={styles.loading}>読み込み中…</main>
    case 'signedOut':
      return <LoginScreen />
    case 'signedIn':
      return <AppShell />
  }
}

function App() {
  return (
    <AuthProvider>
      <Screens />
    </AuthProvider>
  )
}

export default App
