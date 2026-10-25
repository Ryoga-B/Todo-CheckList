import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// vitest/config の defineConfig は vite の設定に加えて `test` フィールドの型も持つ。
// vite 側の defineConfig を使うと `test` が型エラーになるため、こちらを使う。
export default defineConfig({
  // GitHub Pages は https://ryoga-b.github.io/ouchi-board/ のようにサブパス配下で公開されるため、
  // ビルド後のファイルの参照先をそのサブパスに合わせる。
  base: '/ouchi-board/',
  plugins: [react()],
  test: {
    // 当面は画面を持たない計算ロジックのテストが中心なので Node 環境で動かす。
    environment: 'node',
  },
})
