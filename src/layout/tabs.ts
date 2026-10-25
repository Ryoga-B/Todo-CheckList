// 4タブの定義。タブを増減・改名するときは、この1か所だけを直せばよい。
//
// `as const` で、配列の中身を「読み取り専用のリテラル型」として扱う。
// これがないと id は ただの string になり、'home' のような具体的な値を型で区別できない。
//
// `satisfies` は「この型の条件を満たしているか」を検査するだけで、推論結果は広げない演算子。
// 型注釈（: 型名）で書くと id が string に広がってしまうが、
// satisfies なら 'home' | 'stock' | ... のリテラル型を保ったまま、形の間違い（label の書き忘れなど）を検出できる。
export const TABS = [
  { id: 'home', label: 'ホーム' },
  { id: 'stock', label: '園ストック' },
  { id: 'todo', label: 'TODO' },
  { id: 'garbage', label: 'ゴミ出し' },
] as const satisfies readonly { id: string; label: string }[]

// TABS の要素から id だけを取り出して、ユニオン型（'home' | 'stock' | 'todo' | 'garbage'）を作る。
// タブを増やすと、この型も自動で増える。
export type TabId = (typeof TABS)[number]['id']
