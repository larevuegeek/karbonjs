import { describe, it, expect } from 'vitest'
import { hasRole, highestRole, isAdmin } from './roles'
import type { RoleHierarchy } from './roles'

const hierarchy: RoleHierarchy = {
  'ROLE_SUPER_ADMIN': ['ROLE_ADMIN'],
  'ROLE_ADMIN': ['ROLE_EDITOR'],
  'ROLE_EDITOR': ['ROLE_USER'],
  'ROLE_USER': [],
}

describe('hasRole', () => {
  it('returns true for direct role', () => {
    expect(hasRole(['ROLE_USER'], 'ROLE_USER', hierarchy)).toBe(true)
  })
  it('returns true for inherited role', () => {
    expect(hasRole(['ROLE_ADMIN'], 'ROLE_USER', hierarchy)).toBe(true)
    expect(hasRole(['ROLE_ADMIN'], 'ROLE_EDITOR', hierarchy)).toBe(true)
  })
  it('returns false for higher role', () => {
    expect(hasRole(['ROLE_USER'], 'ROLE_ADMIN', hierarchy)).toBe(false)
  })
  it('works without hierarchy (exact match only)', () => {
    expect(hasRole(['ROLE_USER'], 'ROLE_USER')).toBe(true)
    expect(hasRole(['ROLE_ADMIN'], 'ROLE_USER')).toBe(false)
  })
  it('handles deep hierarchy', () => {
    expect(hasRole(['ROLE_SUPER_ADMIN'], 'ROLE_USER', hierarchy)).toBe(true)
  })
})

describe('highestRole', () => {
  it('returns highest role by depth', () => {
    expect(highestRole(['ROLE_USER', 'ROLE_ADMIN'], hierarchy)).toBe('ROLE_ADMIN')
  })
  it('returns null for empty array', () => {
    expect(highestRole([], hierarchy)).toBe(null)
  })
  it('returns super admin as highest', () => {
    expect(highestRole(['ROLE_USER', 'ROLE_SUPER_ADMIN'], hierarchy)).toBe('ROLE_SUPER_ADMIN')
  })
})

describe('isAdmin', () => {
  it('returns true for admin', () => {
    expect(isAdmin(['ROLE_ADMIN'], hierarchy)).toBe(true)
  })
  it('returns true for super admin', () => {
    expect(isAdmin(['ROLE_SUPER_ADMIN'], hierarchy)).toBe(true)
  })
  it('returns false for user', () => {
    expect(isAdmin(['ROLE_USER'], hierarchy)).toBe(false)
  })
})
