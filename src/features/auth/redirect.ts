/**
 * ログイン完了後にアプリへ戻ってくるURLを作る。
 *
 * origin と baseUrl を引数で受け取る純粋関数にしているのは、
 * window や import.meta.env に直接依存しないようにして、テストしやすくするため。
 *
 * 例）origin = 'https://ryoga-b.github.io', baseUrl = '/ouchi-board/'
 *     → 'https://ryoga-b.github.io/ouchi-board/'
 *
 * このURLは、SupabaseのRedirect URLsに登録済みのものと一致している必要がある。
 */
export function getRedirectUrl(origin: string, baseUrl: string): string {
  // 文字列の連結だと「/」の重複や欠落が起きやすいので、標準の URL クラスに組み立てを任せる
  return new URL(baseUrl, origin).toString()
}
