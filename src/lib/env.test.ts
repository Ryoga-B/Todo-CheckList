import { describe, expect, it } from 'vitest'
import { getRequiredEnv } from './env'

describe('getRequiredEnv', () => {
  it('設定済みの値を返す', () => {
    expect(getRequiredEnv({ VITE_SUPABASE_URL: 'https://example.test' }, 'VITE_SUPABASE_URL')).toBe(
      'https://example.test',
    )
  })

  it('未設定ならキー名入りのエラーを投げる', () => {
    expect(() => getRequiredEnv({}, 'VITE_SUPABASE_URL')).toThrow('VITE_SUPABASE_URL')
  })

  it('空文字も未設定として扱う', () => {
    expect(() => getRequiredEnv({ VITE_SUPABASE_PUBLISHABLE_KEY: '' }, 'VITE_SUPABASE_PUBLISHABLE_KEY')).toThrow(
      'VITE_SUPABASE_PUBLISHABLE_KEY',
    )
  })
})
