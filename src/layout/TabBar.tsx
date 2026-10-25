import { TabIcon } from './TabIcon'
import { TABS, type TabId } from './tabs'
import styles from './TabBar.module.css'

type Props = {
  current: TabId
  // 親（AppShell）が持つ状態を変える関数を受け取る。TabBar 自身は「どのタブを選んだか」を伝えるだけ。
  onChange: (tab: TabId) => void
}

// 画面下部に固定する4タブのナビゲーション（要件2.1）。
// <a href> ではなく <button> を使うので、押してもページ全体は再読み込みされない（要件2.2）。
export function TabBar({ current, onChange }: Props) {
  return (
    <nav className={styles.bar} aria-label="メインメニュー">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={styles.tab}
          // 選択中のタブを支援技術にも伝える。CSS側もこの属性を見て色を変える
          aria-current={tab.id === current ? 'page' : undefined}
          onClick={() => onChange(tab.id)}
        >
          <TabIcon id={tab.id} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
