export interface Cancelable {
  cancel: () => void
}

/**
 * Create a debounced version of a function.
 * The call is delayed by `ms` milliseconds; any new call resets the timer.
 * Call `.cancel()` to clear pending execution.
 *
 * ```ts
 * const debouncedSearch = debounce(() => loadItems(), 400)
 * input.addEventListener('input', debouncedSearch)
 * // cleanup: debouncedSearch.cancel()
 * ```
 */
export function debounce<T extends (...args: any[]) => void>(fn: T, ms = 400): T & Cancelable {
  let timer: ReturnType<typeof setTimeout> | null = null
  const debounced = ((...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { timer = null; fn(...args) }, ms)
  }) as unknown as T & Cancelable
  debounced.cancel = () => { if (timer) { clearTimeout(timer); timer = null } }
  return debounced
}

/**
 * Create a throttled version of a function.
 * The function is called at most once every `ms` milliseconds.
 * Call `.cancel()` to reset the throttle.
 */
export function throttle<T extends (...args: any[]) => void>(fn: T, ms = 200): T & Cancelable {
  let last = 0
  const throttled = ((...args: any[]) => {
    const now = Date.now()
    if (now - last >= ms) {
      last = now
      fn(...args)
    }
  }) as unknown as T & Cancelable
  throttled.cancel = () => { last = 0 }
  return throttled
}
