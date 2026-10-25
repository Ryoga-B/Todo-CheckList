import { useState } from 'react'
import { GarbageScreen } from '../features/garbage/GarbageScreen'
import { HomeScreen } from '../features/home/HomeScreen'
import { StockScreen } from '../features/stock/StockScreen'
import { TodoScreen } from '../features/todo/TodoScreen'
import { TabBar } from './TabBar'
import type { TabId } from './tabs'
import styles from './AppShell.module.css'

// 選択中のタブに対応する画面を返す。
// switch で TabId の全ケースを書いているので、タブを増やして書き忘れると
// 「戻り値がない経路がある」という型エラーで気づける。
function renderScreen(tab: TabId) {
  switch (tab) {
    case 'home':
      return <HomeScreen />
    case 'stock':
      return <StockScreen />
    case 'todo':
      return <TodoScreen />
    case 'garbage':
      return <GarbageScreen />
  }
}

// ログイン後の共通の枠。選択中のタブの画面と、画面下部に固定した4タブを並べる。
// タブの切り替えはURLではなくこの state で行うので、ページ全体は再読み込みされない。
// 表示中のタブだけを描画するため、タブを切り替えると前の画面の入力内容は破棄される
// （入力のある画面ができた段階で、保持が必要かを見直す）。
export function AppShell() {
  const [tab, setTab] = useState<TabId>('home')

  return (
    <div className={styles.shell}>
      {renderScreen(tab)}
      <TabBar current={tab} onChange={setTab} />
    </div>
  )
}
