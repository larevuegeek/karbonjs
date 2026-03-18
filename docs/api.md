# @karbonjs/api

Type-safe API client for Karbon backends with SSR and client support.

```bash
pnpm add @karbonjs/api
```

## Client-side (Browser)

Auto token refresh on 401, request timeout, deduplication.

```ts
import { createClientApi } from '@karbonjs/api'

const api = createClientApi({
  baseUrl: '/api/v1',
  getToken: () => localStorage.getItem('token'),
  refreshToken: () => refreshAuth(),
  onAuthFailure: () => goto('/login'),
  timeout: 15_000,
  defaultHeaders: { 'X-App': 'my-app' },
})

// GET
const res = await api<{ data: Article[] }>('/articles')
if (res.ok) console.log(res.data)

// POST
const res = await api('/articles', {
  method: 'POST',
  body: { title: 'Hello', content: '...' },
})

// Per-request token override
const res = await api('/admin/stats', { token: adminToken })
```

### Config

| Option | Type | Default | Description |
|---|---|---|---|
| `baseUrl` | `string` | required | API base URL |
| `getToken` | `() => string \| null` | required | Returns current token |
| `refreshToken` | `() => Promise<string \| null>` | — | Called on 401 to refresh |
| `onAuthFailure` | `() => void` | — | Called when refresh fails |
| `timeout` | `number` | `15000` | Request timeout in ms |
| `defaultHeaders` | `Record<string, string>` | — | Headers sent with every request |

### Security features

- Auto token refresh with 10s timeout (prevents hanging)
- Concurrent refresh deduplication
- Error messages truncated to 500 chars
- Distinguishes timeout vs network errors

## Server-side (SSR)

For SvelteKit `load` functions, Next.js `getServerSideProps`, etc.

```ts
import { createServerApi } from '@karbonjs/api'

const api = createServerApi('http://localhost:3005/api/v1')

// In SvelteKit load function
export async function load({ cookies }) {
  const token = cookies.get('token')
  const res = await api<{ data: Article[] }>('/articles', { token })
  return { articles: res.ok ? res.data : [] }
}
```

### Options per request

| Option | Type | Default |
|---|---|---|
| `method` | `'GET' \| 'POST' \| 'PUT' \| 'PATCH' \| 'DELETE'` | `'GET'` |
| `body` | `Record<string, any>` | — |
| `token` | `string` | — |
| `headers` | `Record<string, string>` | — |
| `timeout` | `number` | `15000` |

### Response format

All API calls return `ApiResult`:

```ts
interface ApiResult {
  ok: boolean
  status?: number
  message?: string
}
```

On success: `{ ok: true, ...data }` (server response merged)
On error: `{ ok: false, status: 404, message: "Not found" }`
On timeout: `{ ok: false, status: 0, message: "Request timeout" }`
On network error: `{ ok: false, status: 503, message: "Service temporarily unavailable" }`
