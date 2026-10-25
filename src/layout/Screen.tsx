import type { ReactNode } from 'react'
import styles from './Screen.module.css'

type Props = {
  title: string
  children?: ReactNode
}

// 各タブの画面で共通の枠（見出し付き）。余白などの見た目をここに集約して、画面ごとに重複して書かないようにする。
export function Screen({ title, children }: Props) {
  return (
    <main className={styles.screen}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </main>
  )
}
