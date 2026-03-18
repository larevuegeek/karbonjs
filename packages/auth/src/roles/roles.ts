/**
 * Role hierarchy definition.
 * Higher roles inherit permissions from lower roles.
 *
 * ```ts
 * const hierarchy: RoleHierarchy = {
 *   'ROLE_SUPER_ADMIN': ['ROLE_ADMIN'],
 *   'ROLE_ADMIN': ['ROLE_EDITOR'],
 *   'ROLE_EDITOR': ['ROLE_USER'],
 *   'ROLE_USER': [],
 * }
 * ```
 */
export type RoleHierarchy = Record<string, string[]>

/**
 * Check if a user's roles satisfy a required role, considering hierarchy.
 *
 * ```ts
 * hasRole(['ROLE_ADMIN'], 'ROLE_USER', hierarchy) // true (admin inherits user)
 * hasRole(['ROLE_USER'], 'ROLE_ADMIN', hierarchy)  // false
 * ```
 */
export function hasRole(userRoles: string[], requiredRole: string, hierarchy: RoleHierarchy = {}): boolean {
  if (userRoles.includes(requiredRole)) return true

  // Check hierarchy: does any user role inherit the required role?
  for (const role of userRoles) {
    if (resolveRoles(role, hierarchy).includes(requiredRole)) return true
  }
  return false
}

/**
 * Resolve all inherited roles for a given role.
 */
function resolveRoles(role: string, hierarchy: RoleHierarchy, visited = new Set<string>()): string[] {
  if (visited.has(role)) return []
  visited.add(role)

  const children = hierarchy[role] ?? []
  const all = [role]
  for (const child of children) {
    all.push(...resolveRoles(child, hierarchy, visited))
  }
  return all
}

/**
 * Get the highest priority role from a list.
 * Priority is determined by hierarchy depth (deeper = higher).
 */
export function highestRole(userRoles: string[], hierarchy: RoleHierarchy): string | null {
  if (userRoles.length === 0) return null

  let best = userRoles[0]
  let bestDepth = 0

  for (const role of userRoles) {
    const depth = resolveRoles(role, hierarchy).length
    if (depth > bestDepth) {
      bestDepth = depth
      best = role
    }
  }

  return best
}

/**
 * Shorthand: check if user has admin-level access.
 */
export function isAdmin(userRoles: string[], hierarchy: RoleHierarchy = {}): boolean {
  return hasRole(userRoles, 'ROLE_ADMIN', hierarchy)
}
