import { createContext } from 'react'
// `import type` は「型としてしか使わない」ことを明示する書き方（tsconfig の verbatimModuleSyntax で必須）。
// ビルド後のJavaScriptからは消えるので、不要なimportが残らない。
import type { User } from '@supabase/supabase-js'

// ログイン状態を「判別可能ユニオン型」で表す。
// status という共通のプロパティの値で、残りの形が決まる型のこと。
// - `signedIn` のときだけ user が必ず存在する
// - `loading` や `signedOut` では user に触れない（触ろうとすると型エラーになる）
// 「user: User | null」と別々の変数で持つ方法と比べて、
// 「ログイン済みなのに user がない」のような矛盾した状態を、型の上で作れなくできる。
// なお User は supabase-js が提供する型で、Googleアカウントの情報（メールアドレスなど）を持つ。
export type AuthState =
  | { status: 'loading' }
  | { status: 'signedOut' }
  | { status: 'signedIn'; user: User }

// 操作の結果。失敗したら画面に表示するため、エラーメッセージを返す（成功なら null）。
// 例外を投げる方式と比べて、「失敗があり得る」ことが戻り値の型に表れ、
// 呼び出し側が失敗の扱いを書き忘れにくくなる。
export type AuthResult = { errorMessage: string | null }

export type AuthContextValue = {
  state: AuthState
  signInWithGoogle: () => Promise<AuthResult>
  signOut: () => Promise<AuthResult>
}

// createContext<T> のジェネリクス（<>の部分）で、Contextが運ぶ値の型を指定する。
// Provider の外で使われたことを検知するため、初期値は null にしている（useAuth で検査する）。
export const AuthContext = createContext<AuthContextValue | null>(null)
