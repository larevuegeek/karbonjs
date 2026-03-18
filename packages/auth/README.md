# @karbonjs/auth

Authentication helpers for Karbon — token management, user cache, and role hierarchy. Pure TypeScript, framework-agnostic.

## Install

```bash
npm install @karbonjs/auth @karbonjs/types
```

## User Cache (SSR)

Prevents hammering your `/profile` endpoint on every SSR request.

```typescript
import { createUserCache } from '@karbonjs/auth'

const userCache = createUserCache({
  ttl: 120_000,   // 2 minutes
  maxSize: 500,    // max cached users
})

// In your SSR hook
let user = userCache.get(token)
if (!user) {
  user = await fetchProfile(token)
  if (user) userCache.set(token, user)
}
```

## Token Manager

Server-side token refresh with deduplication (prevents multiple concurrent refresh requests).

```typescript
import { createTokenManager } from '@karbonjs/auth'

const tokenManager = createTokenManager({
  apiUrl: 'http://localhost:3005/api/v1',
  refreshEndpoint: '/auth/refresh',
  onRefresh: (tokens) => {
    // Set new cookies
    cookies.set('token', tokens.token)
    cookies.set('refresh_token', tokens.refreshToken)
  },
  onExpired: () => {
    // Clear session
    cookies.delete('token')
  },
})

const newTokens = await tokenManager.refresh(refreshToken, sessionId)
```

## Role Hierarchy

Check roles with inheritance support.

```typescript
import { hasRole, isAdmin, highestRole } from '@karbonjs/auth'

const hierarchy = {
  'ROLE_SUPER_ADMIN': ['ROLE_ADMIN'],
  'ROLE_ADMIN': ['ROLE_EDITOR'],
  'ROLE_EDITOR': ['ROLE_USER'],
  'ROLE_USER': [],
}

hasRole(['ROLE_ADMIN'], 'ROLE_USER', hierarchy)   // true (inherits)
hasRole(['ROLE_USER'], 'ROLE_ADMIN', hierarchy)    // false
isAdmin(['ROLE_SUPER_ADMIN'], hierarchy)           // true
highestRole(['ROLE_USER', 'ROLE_ADMIN'], hierarchy) // "ROLE_ADMIN"
```

## License

MIT
