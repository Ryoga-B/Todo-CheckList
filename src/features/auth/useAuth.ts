import { useContext } from 'react'
import { AuthContext, type AuthContextValue } from './authContext'

// ログイン状態を取り出すフック。
// useContext の戻り値は AuthContextValue | null なので、null のときはここでエラーにする。
// 以降の呼び出し側は、戻り値を AuthContextValue（nullでない）として扱える。
// これは「型の絞り込み（ナローイング）」で、`!` で黙らせるより安全。
export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext)
  if (value === null) {
    throw new Error('useAuth は AuthProvider の内側で使ってください。')
  }
  return value
}
