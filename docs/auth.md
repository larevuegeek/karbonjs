# @karbonjs/auth

Authentication helpers — token management, user cache, role hierarchy.

```bash
pnpm add @karbonjs/auth
```

## Role Hierarchy

```ts
import { hasRole, isAdmin, highestRole } from '@karbonjs/auth'

const hierarchy = {
  ROLE_SUPER_ADMIN: ['ROLE_ADMIN'],
  ROLE_ADMIN: ['ROLE_EDITOR'],
  ROLE_EDITOR: ['ROLE_USER'],
  ROLE_USER: [],
}

// Check with inheritance
hasRole(['ROLE_ADMIN'], 'ROLE_USER', hierarchy)  // true (admin inherits user)
hasRole(['ROLE_USER'], 'ROLE_ADMIN', hierarchy)  // false

// Shorthand
isAdmin(['ROLE_ADMIN'], hierarchy)  // true
isAdmin(['ROLE_USER'], hierarchy)   // false

// Highest role
highestRole(['ROLE_USER', 'ROLE_ADMIN'], hierarchy)  // "ROLE_ADMIN"
```

## Token Manager

Server-side token refresh with deduplication and timeout.

```ts
import { createTokenManager } from '@karbonjs/auth'

const tokenManager = createTokenManager({
  refreshEndpoint: '/auth/refresh',
  apiUrl: 'http://localhost:3005/api/v1',
  timeout: 10_000,
  onRefresh: (tokens) => {
    setCookie('token', tokens.token)
    setCookie('refresh_token', tokens.refreshToken)
  },
  onExpired: () => clearSession(),
})

const newTokens = await tokenManager.refresh(refreshToken, sessionId)
// Returns TokenPair | null
```

### Config

| Option | Type | Default | Description |
|---|---|---|---|
| `refreshEndpoint` | `string` | required | e.g. `"/auth/refresh"` |
| `apiUrl` | `string` | required | Base API URL |
| `timeout` | `number` | `10000` | Request timeout in ms |
| `onRefresh` | `(tokens: TokenPair) => void` | — | Called on success |
| `onExpired` | `() => void` | — | Called on failure |

### Security features

- AbortController timeout (default 10s)
- Validates response tokens are non-empty
- Concurrent refresh deduplication

## User Cache

In-memory user cache for SSR to avoid hitting `/profile` on every request.

```ts
import { createUserCache } from '@karbonjs/auth'

const cache = createUserCache({ ttl: 120_000, maxSize: 500 })

// In SSR hook
let user = cache.get(token)
if (!user) {
  user = await fetchProfile(token)
  if (user) cache.set(token, user)
}
```

### API

| Method | Description |
|---|---|
| `get(token)` | Returns `AuthUser \| null` |
| `set(token, user)` | Stores user with TTL |
| `invalidate(token)` | Delete specific entry |
| `clear()` | Empty entire cache |
| `size` | Current entry count |

### Features

- LRU eviction when maxSize reached
- Automatic expired entry cleanup before eviction
- TTL-based expiration (default 2 minutes)
- Collision-resistant 64-bit dual-seed hash for token keys
- `destroy()` method to stop cleanup timer and free resources
