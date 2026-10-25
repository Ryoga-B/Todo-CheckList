/// <reference types="vite/client" />

// import.meta.env に独自の環境変数の型を足す。
// interface は同名で宣言すると中身が合成される（宣言のマージ）ので、
// vite/client が定義済みの ImportMetaEnv を拡張できる。type ではこれができない。
interface ImportMetaEnv {
  // 未設定の場合は undefined になり得るので、あえて optional にしておき、
  // 読み取り側（src/lib/env.ts）で必ず検査させる。
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string
}
