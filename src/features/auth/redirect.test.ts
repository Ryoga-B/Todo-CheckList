import { describe, expect, it } from 'vitest'
import { getRedirectUrl } from './redirect'

describe('getRedirectUrl', () => {
  it('本番のURLを組み立てる', () => {
    expect(getRedirectUrl('https://ryoga-b.github.io', '/ouchi-board/')).toBe(
      'https://ryoga-b.github.io/ouchi-board/',
    )
  })

  it('ローカルのURL（ポート付き）を組み立てる', () => {
    expect(getRedirectUrl('http://localhost:5173', '/ouchi-board/')).toBe(
      'http://localhost:5173/ouchi-board/',
    )
  })
})
