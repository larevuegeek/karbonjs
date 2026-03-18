export interface PaginationProps {
  page: number
  total: number
  perPage: number
  baseUrl: string
}

export function Pagination({ page, total, perPage, baseUrl }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage)

  if (totalPages <= 1) return null

  const pages: number[] = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, page + 2)
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <nav className="flex items-center gap-1">
      {page > 1 && (
        <a
          href={`${baseUrl}?page=${page - 1}`}
          className="rounded-lg p-2 transition-colors text-[var(--karbon-text-3,#8e8aae)] hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] hover:text-[var(--karbon-text,#1a1635)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </a>
      )}

      {pages.map((p) =>
        p === page ? (
          <span
            key={p}
            className="rounded-lg bg-[var(--karbon-primary)] px-3 py-1.5 text-sm font-medium text-white"
          >
            {p}
          </span>
        ) : (
          <a
            key={p}
            href={`${baseUrl}?page=${p}`}
            className="rounded-lg px-3 py-1.5 text-sm transition-colors text-[var(--karbon-text-2,#5a567e)] hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] hover:text-[var(--karbon-text,#1a1635)]"
          >
            {p}
          </a>
        )
      )}

      {page < totalPages && (
        <a
          href={`${baseUrl}?page=${page + 1}`}
          className="rounded-lg p-2 transition-colors text-[var(--karbon-text-3,#8e8aae)] hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] hover:text-[var(--karbon-text,#1a1635)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </a>
      )}

      <span className="ml-2 text-sm text-[var(--karbon-text-4,#b5b2cc)]">
        {total} résultats
      </span>
    </nav>
  )
}
