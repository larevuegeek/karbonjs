# @karbonjs/api

Type-safe API client for Karbon backends. Supports both **server-side** (SSR) and **client-side** with automatic token refresh.

## Install

```bash
npm install @karbonjs/api @karbonjs/types
```

## Server-side (SSR)

For SvelteKit `load` functions, Next.js `getServerSideProps`, or any Node.js server code.

```typescript
import { createServerApi } from '@karbonjs/api/server'

const callApi = createServerApi('http://localhost:3005/api/v1')

// In a SvelteKit load function
export async function load() {
  const articles = await callApi('/articles?per_page=10')
  return { articles: articles.data }
}

// With authentication
const user = await callApi('/account/profile', {
  token: 'jwt-token-here'
})
```

## Client-side

For browser-side API calls with automatic 401 retry via refresh tokens.

```typescript
import { createClientApi } from '@karbonjs/api'

const api = createClientApi({
  baseUrl: '/api/v1',
  getToken: () => localStorage.getItem('token'),
  refreshToken: async () => {
    const res = await fetch('/auth/refresh', { method: 'POST' })
    const data = await res.json()
    localStorage.setItem('token', data.token)
    return data.token
  },
  onAuthFailure: () => {
    window.location.href = '/login'
  },
})

// Auto-refreshes token on 401
const articles = await api('/articles')
```

## Options

```typescript
await callApi('/articles', {
  method: 'POST',
  body: { title: 'New article' },
  token: 'bearer-token',
  headers: { 'X-Custom': 'value' },
  timeout: 5000,  // ms, default 15000
})
```

## License

MIT
