// 環境変数の読み取り口。
// 値の欠落を「実行時の謎のエラー」ではなく「分かりやすいエラー」にするために、
// 読み取りをこの関数に集約する。

// 読み取り対象のキー名。`as const` を付けると、string[] ではなく
// readonly ['VITE_SUPABASE_URL', 'VITE_SUPABASE_PUBLISHABLE_KEY'] という
// 文字列リテラルの組として推論される。
export const REQUIRED_ENV_KEYS = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_PUBLISHABLE_KEY',
] as const

// 配列の要素から、キー名のユニオン型（'VITE_SUPABASE_URL' | 'VITE_SUPABASE_PUBLISHABLE_KEY'）を作る。
// キー名を2か所に書かずに済み、片方だけ直し忘れる事故を防げる。
export type EnvKey = (typeof REQUIRED_ENV_KEYS)[number]

// 引数の型を Record<EnvKey, string | undefined> のように広く取ると、
// テストでは import.meta.env ではなく普通のオブジェクトを渡せる。
export type EnvSource = Partial<Record<EnvKey, string>>

/**
 * 必須の環境変数を取り出す。未設定または空文字なら、キー名入りのエラーを投げる。
 * 戻り値は string だけ（undefined を含まない）なので、呼び出し側で null チェックが要らない。
 */
export function getRequiredEnv(source: EnvSource, key: EnvKey): string {
  const value = source[key]
  // `!value` は空文字も弾く。.env.example のまま値が空のときを検知するため。
  if (!value) {
    throw new Error(`環境変数 ${key} が設定されていません。.env を確認してください。`)
  }
  return value
}
