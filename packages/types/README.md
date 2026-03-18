# @karbonjs/types

Shared TypeScript types for Karbon API responses. Used by `@karbonjs/api` and your application code.

## Install

```bash
npm install @karbonjs/types
```

## Types

```typescript
import type { ApiList, ApiResult, ApiError, ApiCallOptions, BaseContent, AuthUser, PaginationParams } from '@karbonjs/types'

// Paginated API response
const res: ApiList<Article> = await callApi('/articles')
res.data        // Article[]
res.meta.total  // number
res.meta.page   // number

// Base content fields (common to all CMS content types)
interface Article extends BaseContent {
  body: string
  bodyShort: string
}

// Auth user
const user: AuthUser = {
  id: 1,
  username: 'admin',
  email: 'admin@example.com',
  roles: ['ROLE_ADMIN'],
}
```

## License

MIT
