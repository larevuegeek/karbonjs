export { createUserCache } from './cache/user-cache.js'
export type { UserCacheOptions } from './cache/user-cache.js'

export { createTokenManager } from './token/token-manager.js'
export type { TokenManagerConfig, TokenPair } from './token/token-manager.js'

export { hasRole, isAdmin, highestRole } from './roles/roles.js'
export type { RoleHierarchy } from './roles/roles.js'
