import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { supabase } from '../../lib/supabase'
import { getRedirectUrl } from './redirect'
import { AuthContext, type AuthContextValue, type AuthResult, type AuthState } from './authContext'

type Props = {
  // ReactNode は「Reactが描画できるもの全部」を表す型（要素、文字列、null など）
  children: ReactNode
}

async function signInWithGoogle(): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // import.meta.env.BASE_URL は vite.config.ts の base（/ouchi-board/）が入る
      redirectTo: getRedirectUrl(window.location.origin, import.meta.env.BASE_URL),
    },
  })
  // 成功するとGoogleの画面へ移動するので、ここに戻ってくるのは失敗したときだけ
  return { errorMessage: error ? 'ログインを開始できませんでした。もう一度お試しください。' : null }
}

async function signOut(): Promise<AuthResult> {
  const { error } = await supabase.auth.signOut()
  return { errorMessage: error ? 'ログアウトできませんでした。もう一度お試しください。' : null }
}

export function AuthProvider({ children }: Props) {
  // useState にもジェネリクスで型を渡し、AuthState 以外の値を入れられないようにする
  const [state, setState] = useState<AuthState>({ status: 'loading' })

  useEffect(() => {
    // onAuthStateChange は、登録した直後に現在のセッションを1回通知し（INITIAL_SESSION）、
    // その後もログイン・ログアウト・トークン更新のたびに通知してくれる。
    // 起動時の取得（getSession）と変化の監視を、これ1つにまとめられる。
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(session ? { status: 'signedIn', user: session.user } : { status: 'signedOut' })
    })
    // 後片付け。画面が消えるときに監視をやめないと、監視が重複して残ってしまう
    return () => data.subscription.unsubscribe()
  }, [])

  // useMemo で値を使い回し、state が変わらないのに配下の画面が再描画されるのを防ぐ
  const value = useMemo<AuthContextValue>(() => ({ state, signInWithGoogle, signOut }), [state])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
