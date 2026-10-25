import type { ReactNode } from 'react'
import type { TabId } from './tabs'

type Props = {
  id: TabId
}

// タブのアイコン（線画のSVG）。アイコン用のライブラリは入れず、必要な4つだけを直接書いている。
// stroke="currentColor" にすると、親要素の文字色がそのまま線の色になる（選択中の色変更がCSSだけで済む）。
export function TabIcon({ id }: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      // 文言はタブのラベルが担うので、アイコンは読み上げの対象から外す
      aria-hidden="true"
    >
      {paths[id]}
    </svg>
  )
}

// Record<TabId, ...> は「TabId の全部をキーに持つオブジェクト」を要求する型。
// タブを増やしたのにアイコンを足し忘れると、ここで型エラーになる。
const paths: Record<TabId, ReactNode> = {
  home: <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />,
  stock: (
    <>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </>
  ),
  todo: (
    <>
      <path d="M9 11l3 3 8-8" />
      <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
    </>
  ),
  garbage: (
    <>
      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6M10 11v6M14 11v6" />
    </>
  ),
}
