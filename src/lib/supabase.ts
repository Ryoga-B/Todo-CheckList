import { createClient } from '@supabase/supabase-js'
import { getRequiredEnv } from './env'

// Supabaseクライアントはアプリ全体で1つだけ作って使い回す。
// 何度も作ると、ログイン状態（セッション）の管理が重複してしまうため。
//
// 渡しているのは publishable key（旧 anon key）だけ。ビルド後のファイルに含まれ、
// 誰でも読める前提の値なので、これ自体では守られない。
// データを守るのはDB側のRLS（行単位のアクセス制御）の役割になる。
export const supabase = createClient(
  getRequiredEnv(import.meta.env, 'VITE_SUPABASE_URL'),
  getRequiredEnv(import.meta.env, 'VITE_SUPABASE_PUBLISHABLE_KEY'),
)
